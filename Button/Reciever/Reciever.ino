#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char *SSID = "CartoonNetwork";
const char *PSK = "SPJ2017krda78";
const char *MQTT_BROKER = "192.168.0.248";

// constants won't change. They're used here to set pin numbers:
const int buttonPin = D4; // the number of the pushbutton pin
const int ledPin = D1;    // the number of the LED pin
bool pressed = false;
// variables will change:
int buttonState = 0; // variable for reading the pushbutton status
WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;
int state = 0;

void setup()
{

  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(MQTT_BROKER, 1883);
  client.setCallback(callback);
}

void callback(char *topic, byte *payload, unsigned int length)
{
  StaticJsonDocument<256> doc;
  deserializeJson(doc, payload, length);
  // use the JsonDocument as usual...
  const char *type = doc["type"];
  if (type == "action")
  {
    state = 1;
  }
  Serial.println(state);
}

void setup_wifi()
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  WiFi.begin(SSID, PSK);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect()
{
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("arduinoClient"))
    {
      Serial.println("connected");
      // ... and resubscribe
      client.subscribe("/s/d/0");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  if (state == 1)
  {
    state = 0;
    Serial.println(state);
  }
}
