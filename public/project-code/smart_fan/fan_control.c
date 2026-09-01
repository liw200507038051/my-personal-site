#include "main.h"
typedef enum { FAN_AUTO, FAN_MANUAL } FanMode; static FanMode mode=FAN_AUTO; static uint8_t level=0;
extern float dht11_temperature(void); extern bool pir_present(void); extern uint8_t ir_get_key(void);
extern void motor_set_pwm(uint8_t duty); extern void oled_show(float t,uint8_t speed,FanMode m);
static uint8_t auto_level(float t,bool present){ if(!present || t<24) return 0; if(t<27) return 30; if(t<30) return 60; return 90; }
void fan_task_10ms(void){ uint8_t key=ir_get_key(); if(key==0x10) mode=FAN_AUTO; if(key==0x11) mode=FAN_MANUAL; if(mode==FAN_MANUAL && key>=1 && key<=3) level=key*30; float t=dht11_temperature(); bool p=pir_present(); uint8_t out=mode==FAN_AUTO?auto_level(t,p):level; motor_set_pwm(out); oled_show(t,out/30,mode); }
