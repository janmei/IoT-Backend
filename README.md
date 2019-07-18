# Einführung

## Einleitung

Die Dokumentation befindet sich auf [https://docs.janmeininghaus.com/](https://docs.janmeininghaus.com/)

Das Projekt wurde im Rahmen der Semester-Abgabe für CC erstellt und beinhaltet eine Architektur, die es einfach macht, die Kommunikation von IoT Geräten zu steuern und zu bearbeiten. Das System basiert auf einer MongoDB Datenbank, einem Node Server als Backend und API Steuerung, sowie einem React-Frontend zur Anpassungen der Kommunikation zwischen den Geräten.

### Setup

#### Voraussetzungen

* [MongoDB](https://docs.mongodb.com/manual/installation/) \(Port 27017\)
* [MQTT Broker](https://mosquitto.org/download/) \(Port 1883\)

Zu Beginn des Setups sollte man das Repository klonen oder herunterladen. Nachfolgende Kommandos gehen davon aus, dass das die Kommandozeile auf das Hauptverzeichnis der Repo zeigt.

#### React Front-End

Damit das Front-End alle Abhängigkeiten installiert und zur Entwicklung gestartet werden kann, folgende Kommandos in die Kommandozeile eingeben:

`cd front-end`  um in das richtige Verzeichnis einzusteigen.

`npm install` oder `yarn install`

#### MongoDB

Damit die Rest API auch ordentlich funktioniert müssen auch die Abhängigkeiten des Routings installiert werden. Das Verzeichnis dafür ist `mongo`

In diesem Verzeichnis `npm install` ausführen um alles korrekt zu installieren. 

Danach kann der MongoDB Server gestartet werden. `mongod` startet diesen oder falls anderes installiert mit zusätzlichen Optionen dahinter.

Läuft der Server ohne Probleme kann das Routing gestartet werden

Im Verzeichnis `mongo` einfach das Kommando `npm run dev` ausführen um die Entwicklungsumgebung auszuführen. 

#### Routing und MQTT Client Logik

Damit die MQTT Nachrichten an das richtige Gerät übermittelt werden, muss noch ein letztes Skript gestartet werden. Dieses Skript erkennt ob neue Geräte in das Netzwerk sich eingewählt haben und fügt diese der Datenbank hinzu. Außerdem kümmert sich das Skript darum, dass Anfragen die von den Clients kommen mit der Datenbank überprüft werden und daraufhin an die entsprechenden Geräte gesendet werden um weitere Aktionen zu triggern. 

Das Skript befindet sich im Rootverzeichnis des Projekts und wird mit `node server.js` gestartet. 

Falls der Port des MQTT Brokers von dem oben genannten Port abweicht, muss dieser in der server.js Datei angepasst werden. 

#### ESP Build oder Simulation

Falls zwei ESPs mit Buttons zur Verfügung stehen kann man eine einfache Button Schaltung bauen und das Skript `Button.ino` aus `Button/Button/` auf die ESPs laden. 

Anderen falls kann man auch die Skripte receiver.js und button.js mit `node button.js` und `node receiver.js` sin separaten Terminals starten.

Diese senden alle 5 Sekunden Signale und simulieren so eine Kommunikation untereinander. Die LED muss man sich dann denken ;\) 

