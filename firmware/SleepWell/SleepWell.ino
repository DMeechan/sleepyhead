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
#include <Adafruit_BMP280.h>
#include <RohmMultiSensor.h>
#include <MAX30105.h>
#include <Adafruit_SGP30.h>
#include <Adafruit_VEML6075.h>

Adafruit_BMP280 bmp;
BH1745NUC bh;
MAX30105 max;
Adafruit_SGP30 sgp;
Adafruit_VEML6075 uv;

WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, host, port);

void setup()
{
  /* == INTERFACES == */
  Wire.begin();

  Serial.begin(115200);
  while (!Serial)
    ;
  Serial.println("\n=== SleepWell ===");

  /* == SENSORS == */
  Serial.println("\nInitialising sensors:");
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
  if (!bh.init())
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

  /* == INIT COMPLETE == */
  Serial.println("\nINIT COMPLETE\n");
}

void loop()
{
  Serial.print("Constructing JSON readings object:\n\t");

  JSONVar readings;

  /* BMP280 */
  readings["temp"] = (int)(bmp.readTemperature() + 0.5);

  /* SGP30 */
  sgp.IAQmeasure();
  readings["tvoc"] = sgp.TVOC;
  readings["eco2"] = sgp.eCO2;

  /* MAX30105 */
  readings["ir"] = max.getIR();

  /* BH1745 */
  bh.measure();
  readings["blue"] = bh.blue;
  readings["clear"] = bh.clear;

  /* VEML6075 */
  readings["uv"] = uv.readUVI();

  String contentType = "application/json";
  String postData = JSON.stringify(readings);

  Serial.println(readings);

  Serial.println("\nSending POST request");
  client.post("https://sleepyhead-server.onrender.com/user/2c4ebecc-e000-42d5-93df-27b6e3fe3561/reading", contentType, postData);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  delay(1000);
}
