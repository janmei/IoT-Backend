#include <ESP8266WiFi.h>
#include <PubSubClient.h>
 
const char* SSID = "CartoonNetwork";
const char* PSK = "SPJ2017krda78";
const char* MQTT_BROKER = "192.168.0.248";

 // constants won't change. They're used here to set pin numbers:
const int buttonPin = D4;     // the number of the pushbutton pin
const int ledPin =  D1;      // the number of the LED pin
bool pressed = false;
// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;
 
void setup() {
  
      // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  
    Serial.begin(115200);
    setup_wifi();
    client.setServer(MQTT_BROKER, 1883);

}
 
void setup_wifi() {
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(SSID);
 
    WiFi.begin(SSID, PSK);
 
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
 
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}
 
void reconnect() {
    while (!client.connected()) {
        Serial.print("Reconnecting...");
        if (!client.connect("ESP8266Client")) {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" retrying in 5 seconds");
            delay(5000);
        }
    }
}
void loop() {
 
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

      // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == LOW) {
    if(!pressed){
      pressed = true;
      Serial.print("Publish message: ");
      Serial.println(msg);
      client.publish("/home/data", "Hello World");
      // turn LED on:
      digitalWrite(ledPin, LOW);
    }
  } else {
    // turn LED off:
    digitalWrite(ledPin, HIGH);
    pressed = false;
  }

}
