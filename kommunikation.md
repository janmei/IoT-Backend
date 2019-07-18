# MQTT

Die Geräte kommunizieren über einen MQTT Broker welcher entweder lokal oder über eine externen Anbieter gehostet werden kann. Für das Projekt wurde sich für einen lokalen MQTT Broker entschieden, da dieser leichter ist erstellen und mehr Debugging Daten zur Verfügung stellt, als ein externer Anbieter.

Um die Richtung der Kommunikation zu unterscheiden, wurde sich für ein simples Schema entschieden, aus welchem vorgeht von wem die Nachricht kommt und an wen sie gerichtet ist. 

Das Schema setzt sich dabei wie folgt zusammen 

```text
/TYP_START/TYP_END/ID
```

`TYP_START` bzw. `TYP_END` können Werte wie `s` für Server und `d` für Device annehmen. Die `ID` ist eine Zahl, welche in der Datenbank als dId hinterlegt ist. Diese startet von 0 und steigt von dort auf. 

Die Endgeräte hören sind dementsprechend zum Beispiel auf das Topic `/s/d/0` abonniert, welches beschriebt, dass eine Kommunikation vom Server ausgeht und beim Gerät mit der ID 0 ankommen soll. Der Server wiederum hört nur auf Nachrichten mit dem Topic `/d/s/` da es egal ist, von welchem Gerät die Nachricht kommt. 

### Daten

Mit jeder MQTT Nachricht, werden ebenfalls Daten versendet, welche von sowohl dem Server als auch den Geräten verarbeitet werden kann. Hierbei wurde eine eindeutige Struktur verwendet, damit jeder Button die selben Daten verarbeiten kann. 

Um in Zukunft weitere Abfragen machen zu können wurde sich folgende JSON ausgedacht: 

```javascript
{
    id: 0,
    type: 'action'
}
```

Dadurch das `type` ein String ist, kann man weiter Aktionen triggern und diese über das Front-End einstellen. 

