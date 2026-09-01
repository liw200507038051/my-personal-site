#include <arpa/inet.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <sys/epoll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <cerrno>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <functional>
#include <iostream>
#include <mutex>
#include <queue>
#include <condition_variable>
#include <sstream>
#include <thread>
#include <vector>

class ThreadPool {
public:
    explicit ThreadPool(size_t n) : stop_(false) {
        for (size_t i = 0; i < n; ++i)
            workers_.emplace_back([this] { run(); });
    }
    ~ThreadPool() {
        { std::lock_guard<std::mutex> lk(mu_); stop_ = true; }
        cv_.notify_all();
        for (auto &t : workers_) t.join();
    }
    void submit(std::function<void()> job) {
        { std::lock_guard<std::mutex> lk(mu_); jobs_.push(std::move(job)); }
        cv_.notify_one();
    }
private:
    void run() {
        for (;;) {
            std::function<void()> job;
            { std::unique_lock<std::mutex> lk(mu_);
              cv_.wait(lk, [this]{ return stop_ || !jobs_.empty(); });
              if (stop_ && jobs_.empty()) return;
              job = std::move(jobs_.front()); jobs_.pop(); }
            job();
        }
    }
    std::vector<std::thread> workers_; std::queue<std::function<void()>> jobs_;
    std::mutex mu_; std::condition_variable cv_; bool stop_;
};

static bool set_nonblocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    return flags >= 0 && fcntl(fd, F_SETFL, flags | O_NONBLOCK) == 0;
}
static std::string mime(const std::string &p) {
    auto ext = std::filesystem::path(p).extension().string();
    if (ext == ".html" || ext == ".htm") return "text/html; charset=utf-8";
    if (ext == ".css") return "text/css";
    if (ext == ".js") return "application/javascript";
    if (ext == ".jpg" || ext == ".jpeg") return "image/jpeg";
    if (ext == ".png") return "image/png";
    return "application/octet-stream";
}
static std::string response(const std::string &root, const std::string &target) {
    std::string path = target == "/" ? "/index.html" : target;
    if (path.find("..") != std::string::npos || path.find('\0') != std::string::npos)
        return "HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
    std::filesystem::path file = std::filesystem::weakly_canonical(std::filesystem::path(root) / path.substr(1));
    std::filesystem::path base = std::filesystem::weakly_canonical(root);
    if (file.string().rfind(base.string(), 0) != 0 || !std::filesystem::is_regular_file(file))
        return "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
    std::ifstream in(file, std::ios::binary); std::string body((std::istreambuf_iterator<char>(in)), {});
    std::ostringstream out; out << "HTTP/1.1 200 OK\r\nContent-Type: " << mime(file.string())
        << "\r\nContent-Length: " << body.size() << "\r\nConnection: close\r\n\r\n" << body;
    return out.str();
}
int main(int argc, char **argv) {
    int port = argc > 1 ? std::stoi(argv[1]) : 8080; std::string root = argc > 2 ? argv[2] : ".";
    int listenfd = socket(AF_INET, SOCK_STREAM, 0); int one = 1;
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(one)); set_nonblocking(listenfd);
    sockaddr_in addr{}; addr.sin_family = AF_INET; addr.sin_addr.s_addr = INADDR_ANY; addr.sin_port = htons(port);
    if (bind(listenfd, (sockaddr*)&addr, sizeof(addr)) || listen(listenfd, SOMAXCONN)) return 1;
    int ep = epoll_create1(0); epoll_event ev{}; ev.events = EPOLLIN; ev.data.fd = listenfd; epoll_ctl(ep, EPOLL_CTL_ADD, listenfd, &ev);
    ThreadPool pool(std::max(2u, std::thread::hardware_concurrency())); std::vector<epoll_event> events(64);
    std::mutex write_mu;
    while (true) {
        int n = epoll_wait(ep, events.data(), (int)events.size(), -1);
        for (int i = 0; i < n; ++i) {
            int fd = events[i].data.fd;
            if (fd == listenfd) { for (;;) { int c = accept(listenfd, nullptr, nullptr); if (c < 0) { if (errno==EAGAIN || errno==EWOULDBLOCK) break; } else { set_nonblocking(c); epoll_event ce{}; ce.events=EPOLLIN|EPOLLET; ce.data.fd=c; epoll_ctl(ep, EPOLL_CTL_ADD,c,&ce); } } }
            else { pool.submit([fd, root, ep] { char buf[8192]; std::string req; for (;;) { ssize_t r=recv(fd,buf,sizeof(buf),0); if(r>0) req.append(buf,r); else if(r<0 && errno==EAGAIN) break; else { close(fd); return; } if(req.find("\r\n\r\n")!=std::string::npos) break; } std::istringstream in(req); std::string method,target,version; in>>method>>target>>version; std::string out = method=="GET" ? response(root,target) : "HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"; size_t off=0; while(off<out.size()){ ssize_t w=send(fd,out.data()+off,out.size()-off,0); if(w>0) off+=w; else if(errno==EINTR) continue; else break; } epoll_ctl(ep,EPOLL_CTL_DEL,fd,nullptr); close(fd); }); }
        }
    }
}
