#include <Arduino.h>
#line 1 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
#line 1 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char *SSID = "CartoonNetwork";
const char *PSK = "SPJ2017krda78";
const char *MQTT_BROKER = "192.168.0.248";
const int idInt = 1;

char idStr = char(idInt);

// constants won't change. They're used here to set pin numbers:
const int buttonPin = D5;       // the number of the pushbutton pin
const int ledPin = BUILTIN_LED; // the number of the LED pin
bool pressed = false;
bool started = false;
// variables will change:
int buttonState = 0; // variable for reading the pushbutton status
WiFiClient espClient;
PubSubClient client(espClient);

char msg[50];
int value = 0;
int state = 0;

#line 27 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void setup();
#line 45 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void setup_wifi();
#line 66 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
String macToStr(const uint8_t *mac);
#line 78 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void reconnect();
#line 112 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void callback(char *topic, byte *payload, unsigned int length);
#line 125 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void loop();
#line 27 "/Applications/XAMPP/xamppfiles/htdocs/IoT-Backend/Button/Button/Button.ino"
void setup()
{

  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT_PULLUP);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(MQTT_BROKER, 1883);
  client.setCallback(callback);

  digitalWrite(ledPin, HIGH);

  started = true;
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

String macToStr(const uint8_t *mac)
{
  String result;
  for (int i = 0; i < 6; ++i)
  {
    result += String(mac[i], 16);
    if (i < 5)
      result += ':';
  }
  return result;
}

void reconnect()
{
  // Generate client name based on MAC address and last 8 bits of microsecond counter
  String clientName;
  clientName += "esp8266-";
  uint8_t mac[6];
  WiFi.macAddress(mac);
  clientName += macToStr(mac);
  clientName += "-";
  clientName += String(micros() & 0xff, 16);

  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect((char *)clientName.c_str()))
    {
      Serial.println("connected");
      // ... and resubscribe
      char buf[100];
      sprintf(buf, "/s/d/%d", idInt);
      client.subscribe(buf);
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
void callback(char *topic, byte *payload, unsigned int length)
{
  StaticJsonDocument<256> doc;
  deserializeJson(doc, payload, length);
  // use the JsonDocument as usual...
  if (doc["type"] == "action")
  {
    state = 1;
    digitalWrite(ledPin, LOW);
  }
  Serial.println(state);
}

void loop()
{

  const size_t capacity = 2 * JSON_OBJECT_SIZE(2) + 90;
  char buffer[526];
  DynamicJsonDocument doc(capacity);

  doc["id"] = idInt;

  JsonObject action = doc.createNestedObject("action");
  action["type"] = "action";
  action["state"] = 1;

  serializeJson(doc, buffer);

  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == LOW && started)
  {
    if (!pressed && state != 1)
    {
      pressed = true;
      char buf[100];
      sprintf(buf, "/d/s/%d", idInt);
      Serial.print("Publish message: ");
      Serial.println(msg);
      client.publish(buf, buffer);
      // turn LED on:
      // digitalWrite(ledPin, LOW);
    }
    else if (!pressed && state == 1)
    {
      digitalWrite(ledPin, HIGH);
      pressed = true;
      state = 0;
      Serial.println("Switched off LED");
    }
  }
  else
  {
    // turn LED off:
    // digitalWrite(ledPin, LOW);
    pressed = false;
  }
}
