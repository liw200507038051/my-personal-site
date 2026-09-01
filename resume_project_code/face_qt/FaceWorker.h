#pragma once
#include <QObject>
#include <QImage>
#include <opencv2/opencv.hpp>
class FaceWorker : public QObject { Q_OBJECT
public slots: void process(const cv::Mat &frame){ if(frame.empty()) return; cv::Mat gray; cv::cvtColor(frame,gray,cv::COLOR_BGR2GRAY); std::vector<cv::Rect> faces; cascade.detectMultiScale(gray,faces); QImage img(frame.data,frame.cols,frame.rows,frame.step,QImage::Format_BGR888); emit result(img.copy(),(int)faces.size()); }
signals: void result(const QImage&,int count); void error(QString);
public: cv::CascadeClassifier cascade; };
