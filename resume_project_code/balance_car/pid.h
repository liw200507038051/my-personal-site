#pragma once
#include <algorithm>
struct PID { float kp, ki, kd, integ=0, prev=0, out_min=-100, out_max=100;
  float update(float setpoint,float measured,float dt){ float e=setpoint-measured; integ=std::clamp(integ+e*dt,-1000.f,1000.f); float u=kp*e+ki*integ+kd*(e-prev)/dt; prev=e; return std::clamp(u,out_min,out_max); } };
