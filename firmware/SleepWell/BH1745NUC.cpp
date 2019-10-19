/*****************************************************************************
  BH1745NUC.cpp

 Copyright (c) 2016 ROHM Co.,Ltd.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
******************************************************************************/
#include <avr/pgmspace.h>
#include <Arduino.h>
#include <Wire.h>
#include "BH1745NUC.h"

BH1745NUC::BH1745NUC(int slave_address)
{
  _device_address = slave_address;
}

byte BH1745NUC::init(void)
{
  byte rc;
  unsigned char reg;

  rc = read(BH1745NUC_SYSTEM_CONTROL, &reg, sizeof(reg));
  if (rc != 0) {
    Serial.println(F("Can't access BH1745NUC"));
    return (rc);
  }
  reg = reg & 0x3F;
  //Serial.print(F("BH1745NUC Part ID Value = "));
  //Serial.println(reg, HEX);

  if (reg != BH1745NUC_PART_ID_VAL) {
    Serial.println(F("Can't find BH1745NUC"));
    return (rc);
  }

  rc = read(BH1745NUC_MANUFACTURER_ID, &reg, sizeof(reg));
  if (rc != 0) {
    Serial.println(F("Can't access BH1745NUC"));
    return (rc);
  }
  //Serial.print(F("BH1745NUC MANUFACTURER ID Register Value = "));
  //Serial.println(reg, HEX);

  if (reg != BH1745NUC_MANUFACT_ID_VAL) {
    Serial.println(F("Can't find BH1745NUC"));
    return (rc);
  }

  reg = BH1745NUC_MODE_CONTROL1_VAL;
  rc = write(BH1745NUC_MODE_CONTROL1, &reg, sizeof(reg));
  if (rc != 0) {
    Serial.println(F("Can't write BH1745NUC MODE_CONTROL1 register"));
    return (rc);
  }

  reg = BH1745NUC_MODE_CONTROL2_VAL;
  rc = write(BH1745NUC_MODE_CONTROL2, &reg, sizeof(reg));
  if (rc != 0) {
    Serial.println(F("Can't write BH1745NUC MODE_CONTROL2 register"));
    return (rc);
  }

  reg = BH1745NUC_MODE_CONTROL3_VAL;
  rc = write(BH1745NUC_MODE_CONTROL3, &reg, sizeof(reg));
  if (rc != 0) {
    Serial.println(F("Can't write BH1745NUC MODE_CONTROL3 register"));
    return (rc);
  }

}

byte BH1745NUC::get_rawval(unsigned char *data)
{
  byte rc;

  rc = read(BH1745NUC_RED_DATA_LSB, data, 8);
  if (rc != 0) {
    Serial.println(F("Can't get BH1745NUC RGBC value"));
  }

  return (rc);
}

byte BH1745NUC::get_val(unsigned short *data)
{
  byte rc;
  unsigned char val[8];

  rc = get_rawval(val);
  if (rc != 0) {
    return (rc);
  }

  data[0] = ((unsigned short)val[1] << 8) | val[0];
  data[1] = ((unsigned short)val[3] << 8) | val[2];
  data[2] = ((unsigned short)val[5] << 8) | val[4];
  data[3] = ((unsigned short)val[7] << 8) | val[6];

  return (rc);
}

byte BH1745NUC::write(unsigned char memory_address, unsigned char *data, unsigned char size)
{
  byte rc;

  Wire.beginTransmission(_device_address);
  Wire.write(memory_address);
  Wire.write(data, size);
  rc = Wire.endTransmission();
  return (rc);
}

byte BH1745NUC::read(unsigned char memory_address, unsigned char *data, int size)
{
  byte rc;
  unsigned char cnt;

  Wire.beginTransmission(_device_address);
  Wire.write(memory_address);
  rc = Wire.endTransmission(false);
  if (rc != 0) {
    return (rc);
  }

  Wire.requestFrom(_device_address, size, true);
  cnt = 0;
  while(Wire.available()) {
    data[cnt] = Wire.read();
    cnt++;
  }

  return (0);
}
