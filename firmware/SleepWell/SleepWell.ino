/**
 * SleepWell Firmware
 *
 * Sensors:
 *  BMP280
 *  BH1745
 *  MAX30105
 *  SGP30
 *  VEML6075
 */

#include "Config.h"

#include <Wire.h>
#include <ArduinoHttpClient.h>
#include <WiFi101.h>
#include <Arduino_JSON.h>
#include <ArduinoLowPower.h>

#include <Adafruit_GFX.h>
#include <Adafruit_EPD.h>

#include <Adafruit_BMP280.h>
#include "BH1745NUC.h"
#include <MAX30105.h>
#include <Adafruit_SGP30.h>
#include <Adafruit_VEML6075.h>

WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, host, port);

Adafruit_SSD1675 display(width, height, EPD_DC, EPD_RESET, EPD_CS, SRAM_CS, EPD_BUSY);

Adafruit_BMP280 bmp;
BH1745NUC bh(0x38);
MAX30105 max;
Adafruit_SGP30 sgp;
Adafruit_VEML6075 uv;

void setup()
{
  /* == INTERFACES == */
  Wire.begin();

  Serial.begin(115200);
  while (!Serial)
    ;
  Serial.println("\n=== SleepWell ===");

  /*display.begin();
  display.clearBuffer();
  display.fillScreen(EPD_WHITE);
  display.setCursor(5, 5);
  display.setTextColor(0);
  display.setTextWrap(true);
  display.setTextSize(2);
  display.print("SleepWell");
  display.setTextSize(1);
  display.display();*/

  /* == SENSORS == */
  Serial.println("\nInitialising sensors:");
  // battery
  float measuredvbat = analogRead(VBATPIN);
  measuredvbat *= 2;    // we divided by 2, so multiply back
  measuredvbat *= 3.3;  // Multiply by 3.3V, our reference voltage
  measuredvbat /= 1024; // convert to voltage
  Serial.print("\tBattery: ");
  Serial.print(measuredvbat);
  Serial.println("V");

  // bmp280
  Serial.print("\tBMP280: ");
  if (!bmp.begin(0x76))
  {
    Serial.println("not found!");
    while (1)
      ;
  }
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                  Adafruit_BMP280::SAMPLING_X2,
                  Adafruit_BMP280::SAMPLING_X16,
                  Adafruit_BMP280::FILTER_X16,
                  Adafruit_BMP280::STANDBY_MS_500);
  Serial.println("READY");

  // bh1745
  Serial.print("\tBH1745: ");
  if (bh.init())
  {
    Serial.println("not found!");
    while (1)
      ;
  }
  Serial.println("READY");

  // max30105
  Serial.print("\tMAX30105: ");
  if (!max.begin())
  {
    Serial.println("not found!");
    while (1)
      ;
  }
  max.setup();
  Serial.println("READY");

  // sgp30
  Serial.print("\tSGP30: ");
  if (!sgp.begin())
  {
    Serial.println("not found!");
    while (1)
      ;
  }
  Serial.println("READY");

  // veml6075
  Serial.print("\tVEML6075: ");
  if (!uv.begin())
  {
    Serial.println("not found!");
    while (1)
      ;
  }
  uv.setIntegrationTime(VEML6075_100MS);
  uv.setHighDynamic(true);
  uv.setForcedMode(false);
  uv.setCoefficients(2.22, 1.33,          // UVA_A and UVA_B coefficients
                     2.95, 1.74,          // UVB_C and UVB_D coefficients
                     0.001461, 0.002591); // UVA and UVB responses
  Serial.println("READY");

  /* == NETWORKING == */
  Serial.println("\nInitialising network connection:");
  Serial.print("\tAttempting to connect to \"");
  Serial.print(ssid);
  Serial.println("\"");

  WiFi.setPins(8, 7, 4, 2);

  int status = WiFi.begin(ssid, pass);
  delay(3000);

  if (status == WL_CONNECTED)
  {
    Serial.println("\tCONNECTED");
    Serial.print("\tIP: ");
    IPAddress ip = WiFi.localIP();
    Serial.println(ip);
    Serial.print("\tRSSI: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  }
  else
  {
    Serial.print("\tFAILURE: status ");
    Serial.println(status);
    while (1)
      ;
  }
  WiFi.lowPowerMode();
  //WiFi.setSleepMode(M2M_PS_MANUAL, 1);
  //WiFi.requestSleep(2000);

  /* == INIT COMPLETE == */
  Serial.println("\nINIT COMPLETE\n");
}

void loop()
{
  Serial.print("Constructing JSON readings object:\n\t");

  JSONVar readings;

  /* BMP280 */
  readings["temperature"] = (int)(bmp.readTemperature() + 0.5);

  /* SGP30 */
  sgp.IAQmeasure();
  readings["tvoc"] = map(sgp.TVOC, 0, 500, 100, 0);
  readings["eco2"] = map(sgp.eCO2, 300, 2000, 100, 0);

  /* MAX30105 */
  readings["ir"] = map(max.getIR(), 500, 120000, 100, 0);

  /* BH1745 */
  unsigned short rgbl[4];
  bh.get_val(rgbl);
  readings["blue"] = map(rgbl[2], 0, 65535, 100, 0);
  readings["luminance"] = map(rgbl[3], 0, 65535, 100, 0);

  /* VEML6075 */
  readings["uv"] = map((int)((uv.readUVI() * 100.0) + 0.5), 0, 1000, 100, 0);

  /* SPW2430 */
  readings["noise"] = map(analogRead(A0), 0, 1024, 100, 0);

  String contentType = "application/json";
  String postData = JSON.stringify(readings);

  Serial.println(readings);

  Serial.println("\nSending POST request");
  client.post(url, contentType, postData);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  //LowPower.deepSleep(2000);
  delay(2000);
}
