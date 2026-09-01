#include "mainwindow.h"
#include "FaceWorker.h"
#include <QThread>
// UI 线程只负责显示；摄像头采集和 OpenCV 运算放到 worker 线程。
void MainWindow::startCamera(){
  workerThread=new QThread(this); worker=new FaceWorker; worker->cascade.load("haarcascade_frontalface_default.xml"); worker->moveToThread(workerThread);
  connect(workerThread,&QThread::finished,worker,&QObject::deleteLater); connect(worker,&FaceWorker::result,this,[this](const QImage& im,int n){ ui->preview->setPixmap(QPixmap::fromImage(im)); ui->count->setText(QString::number(n)); }); workerThread->start();
}
