#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "roteador ian";
const char* password = "ian12345";

WebServer server(80);

const int temperaturaPin = 34;  
const int leds[] = {2, 4, 5, 18, 19};
const int numLeds = 5;

void setup() {
  Serial.begin(115200);

  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
    digitalWrite(leds[i], LOW);
  }

  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado.");
  Serial.print("IP do ESP32: ");
  Serial.println(WiFi.localIP());

  server.on("/temp", []() {
    const int numLeituras = 20;
    long soma = 0;

    for (int i = 0; i < numLeituras; i++) {
      soma += analogRead(temperaturaPin);
      delay(5);  
    }

    float mediaADC = soma / (float)numLeituras;
    float tensao = mediaADC * (3.3 / 4095.0);  
    float temperatura = (tensao * 100.0) + 12;       

    Serial.printf("Temperatura lida: %.1f °C\n", temperatura);
    server.send(200, "text/plain", String(temperatura, 1)); 
  });

  server.onNotFound([]() {
    String request = server.uri();
    Serial.println("Requisição recebida: " + request);

    for (int i = 0; i < numLeds; i++) {
      String ledOn = "/led" + String(i + 1) + "/on";
      String ledOff = "/led" + String(i + 1) + "/off";

      if (request == ledOn) {
        digitalWrite(leds[i], HIGH);
        Serial.printf("LED %d LIGADO\n", i + 1);
        server.send(200, "text/plain", "LED " + String(i + 1) + " ligado");
        return;
      }

      if (request == ledOff) {
        digitalWrite(leds[i], LOW);
        Serial.printf("LED %d DESLIGADO\n", i + 1);
        server.send(200, "text/plain", "LED " + String(i + 1) + " desligado");
        return;
      }
    }

    server.send(404, "text/plain", "Comando não encontrado.");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
