#include "main.h"
#include "pid.h"
// 根据 CubeMX 生成的定时器/I2C/编码器句柄替换下列接口。
extern float imu_pitch_deg(void); extern int32_t encoder_left_delta(void), encoder_right_delta(void);
extern void motor_pwm(int left, int right); extern void imu_update(void);
static PID angle_pid{35.0f,0.0f,0.8f}, speed_pid{0.8f,0.15f,0.0f}, turn_pid{0.2f,0,0};
void control_tick_1khz(void){
  imu_update(); float angle=imu_pitch_deg();
  static float speed_ref=0; float speed=(encoder_left_delta()+encoder_right_delta())*0.5f;
  float speed_cmd=speed_pid.update(speed_ref,speed,0.001f);
  float balance=angle_pid.update(speed_cmd,angle,0.001f);
  float turn=turn_pid.update(0,(encoder_right_delta()-encoder_left_delta()),0.001f);
  motor_pwm((int)(balance-turn),(int)(balance+turn));
}
