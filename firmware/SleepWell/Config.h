/*
 * Firmware Configuration
 */

#define VBATPIN A7

const char ssid[] = "Ferdia McKeogh’s iPhone";
const char pass[] = "2d65hy10y76m0";
const char host[] = "34.83.64.96";
const int port = 443;
const char url[] = "https://sleepyhead-server.onrender.com/api/user/e077a290-ca2a-4b54-818b-6f9771d789b5/reading";

#define SD_CS       5
#define SRAM_CS     6
#define EPD_CS      9
#define EPD_DC      10  
#define EPD_RESET   -1 // can set to -1 and share with microcontroller Reset!
#define EPD_BUSY    -1 // can set to -1 to not use a pin (will wait a fixed delay)

const int width = 250;
const int height = 122;
