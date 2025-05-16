#include <WiFi.h>

const char* ssid = "Wifi_2.4Ghz";
const char* password = "senha_da_rede";

WiFiServer server(80);

const int leds[] = {2, 4, 5, 18, 19};
const int numLeds = 5;

void setup() {
  Serial.begin(115200);

  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
    digitalWrite(leds[i], LOW); 
  }

  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado.");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Novo cliente conectado.");
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.flush();

    for (int i = 0; i < numLeds; i++) {
      String ledOn = "/led" + String(i + 1) + "/on";
      String ledOff = "/led" + String(i + 1) + "/off";

      if (request.indexOf(ledOn) != -1) {
        digitalWrite(leds[i], HIGH);
        Serial.printf("LED %d ligado.\n", i + 1);
      } else if (request.indexOf(ledOff) != -1) {
        digitalWrite(leds[i], LOW);
        Serial.printf("LED %d desligado.\n", i + 1);
      }
    }

    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();
    client.println("<!DOCTYPE HTML>");
    client.println("<html><body>Comando recebido!</body></html>");

    delay(1);
    client.stop();
    Serial.println("Cliente desconectado.");
  }
}
