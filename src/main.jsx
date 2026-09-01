import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Download, Mail, MapPin, Menu, X, FileCode2, BookOpen } from 'lucide-react';
import avatar from '../头像.png';
import '../styles.css';

const projects = [
  { number: '01', title: '高性能 HTTP 服务器', type: 'C++ / Linux / epoll', text: '非阻塞 IO、多路复用、线程池与 HTTP/1.1 静态资源服务。', files: [['http_server.cpp', './project-code/http_server/http_server.cpp'], ['CMakeLists.txt', './project-code/http_server/CMakeLists.txt']] },
  { number: '02', title: 'STM32 两轮平衡小车', type: 'STM32 / PID / Firmware', text: '姿态融合、编码器测速、串级 PID 与双轮 PWM 控制。', files: [['control.cpp', './project-code/balance_car/control.cpp'], ['pid.h', './project-code/balance_car/pid.h']] },
  { number: '03', title: 'Qt + OpenCV 人脸识别', type: 'Qt / OpenCV / MySQL', text: '多线程视频处理、人脸检测识别与用户数据管理。', files: [['FaceWorker.h', './project-code/face_qt/FaceWorker.h'], ['mainwindow.cpp', './project-code/face_qt/mainwindow.cpp'], ['schema.sql', './project-code/face_qt/schema.sql']] },
  { number: '04', title: 'STM32 智能风扇', type: 'STM32 / HAL / PWM', text: '温湿度采集、红外遥控、自动/手动模式与 OLED 显示。', files: [['fan_control.c', './project-code/smart_fan/fan_control.c']] },
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <div className="app">
    <div className="ambient" aria-hidden="true" />
    <header className="nav"><a className="logo" href="#top">LI<span>.</span></a><nav className={menuOpen ? 'open' : ''}><a href="#about" onClick={closeMenu}>关于我</a><a href="#projects" onClick={closeMenu}>项目</a><a href="#contact" onClick={closeMenu}>联系</a></nav><a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="top">
      <section className="hero"><div className="hero-bg"><div className="scanlines" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /></div><div className="hero-content"><div className="hero-avatar"><img src={avatar} alt="小李的头像" /><span>HELLO, I'M LI</span></div><p className="kicker"><i /> ELECTRONICS STUDENT · CHANGSHA</p><h1>把想法<br /><em>做成</em>现实。</h1><p className="hero-copy">我是小李，一名电子信息工程在校大学生。<br />专注嵌入式开发，也在学习如何把复杂的事做得简单。</p><div className="hero-actions"><a className="solid-btn" href="#projects">查看作品 <ArrowUpRight size={16} /></a><a className="outline-btn" href="./简历.pdf" download="小李-简历.pdf"><Download size={15} /> 下载简历</a></div></div><div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>© 2026</span></div></section>
      <section className="about section" id="about"><div className="section-meta"><span>01</span><span>PROFILE</span></div><div className="about-layout"><div className="portrait"><img src={avatar} alt="小李的头像" /><span>电子信息工程 · 本科</span></div><div className="about-text"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>在学习中构建，<br /><strong>在实践中成长。</strong></h2><p className="body-copy">目前就读于中南林业科技大学电子信息工程专业，专业排名前 17%。我喜欢从底层理解系统，也享受把一个想法一步步变成可运行的作品。</p><div className="contact-row"><span><MapPin size={15} /> 长沙 · 中国</span><a href="mailto:nameliwang1@outlook.com"><Mail size={15} /> nameliwang1@outlook.com</a></div></div></div><div className="stats"><div><strong>17%</strong><span>专业排名</span></div><div><strong>03+</strong><span>实践项目</span></div><div><strong>C/C++</strong><span>核心语言</span></div><div><strong>2026</strong><span>持续更新</span></div></div></section>
      <section className="projects section" id="projects"><div className="section-meta"><span>02</span><span>SELECTED WORK</span></div><div className="section-title"><h2>精选项目</h2><p>记录我如何学习、拆解并完成一个工程。代码文件可直接下载查看。</p></div><div className="project-list">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-visual"><span>{project.number}</span><div className="visual-center">{project.number === '01' ? '01' : project.number === '02' ? '◎' : project.number === '03' ? '◉' : '＋'}</div></div><div className="project-info"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.text}</p><div className="project-files">{project.files.map(([name, href]) => <a href={href} download key={href}><FileCode2 size={14} /> {name} <Download size={13} /></a>)}</div></div></article>)}</div><div className="project-notes"><a href="./project-code/面试回答稿.md" download><BookOpen size={16} /> 下载面试回答稿 <Download size={14} /></a><a href="./project-code/README.md" download><BookOpen size={16} /> 下载项目说明 <Download size={14} /></a></div></section>
      <section className="contact section" id="contact"><div className="contact-inner"><p className="kicker"><i /> 03 / GET IN TOUCH</p><h2>一起做点<br /><em>有意思的事。</em></h2><div className="contact-bottom"><a className="solid-btn" href="mailto:nameliwang1@outlook.com">发一封邮件 <ArrowUpRight size={16} /></a><div><a href="mailto:nameliwang1@outlook.com">nameliwang1@outlook.com</a><a href="tel:17670610270">176 7061 0270</a><span>长沙 · 中国</span></div></div></div></section>
    </main><footer><span>© 2026 LI WANG</span><span>MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
