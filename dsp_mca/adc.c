#define ADC_ADDR 0x00005000 
#define LED_ADDR 0x00005020
int main (void){
    volatile int * adc = (int*)(ADC_ADDR); 
    volatile int * led = (int*)(LED_ADDR); unsigned int data;
      int count;
      int channel;
      data = 0;
      count = 0;
      channel = 0;
    while (1){
      *(adc) = 0;
      count += 1;
      data = *(adc+channel); 
      data = data/16; *(led) = data;
      if (count==500000){
        count = 0;
          channel = !channel;
}
      }
return 0; }
