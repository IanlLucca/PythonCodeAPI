#include <WiFi.h>

const char* ssid = "Wifi 2.4GHz";
const char* password = "Senha_do_Wifi";

WiFiServer server(80);
int LED = 4;

void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);

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

    if (request.indexOf("/on") != -1) {
      digitalWrite(LED, HIGH);
    } else if (request.indexOf("/off") != -1) {
      digitalWrite(LED, LOW);
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
