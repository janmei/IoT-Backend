# Connections

{% api-method method="get" host="" path="/api/connections" %}
{% api-method-summary %}
Get All Connections
{% endapi-method-summary %}

{% api-method-description %}
Listet alle Verbindungen auf, die zwischen Geräten gerade bestehen.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="" path="/api/connections/:id" %}
{% api-method-summary %}
Get One Connection
{% endapi-method-summary %}

{% api-method-description %}
Listet alle Details über eine Verbindung auf.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=false %}
Object ID der Verbindung
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "id": "5d2e39c99daeda1a68de5411",
    "from": {
        "dId": 0,
        "id": "5d2b8e0913047f50b4efc181"
    },
    "to": {
        "dId": 1,
        "id": "5d2b8d4513047f50b4efc180"
    },
    "createdAt": "2019-07-16T20:55:37.378Z",
    "updatedAt": "2019-07-16T20:55:37.378Z"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="" path="/api/connections" %}
{% api-method-summary %}
Create Connection
{% endapi-method-summary %}

{% api-method-description %}
Erstellt eine Verbindung zwischen zwei Geräten
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="fromID" type="string" required=true %}
Object ID des Geräts welches triggered.
{% endapi-method-parameter %}

{% api-method-parameter name="toID" type="string" required=true %}
Object ID des Geräts welches getriggered werden soll.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="put" host="" path="/api/connections/:id" %}
{% api-method-summary %}
Update
{% endapi-method-summary %}

{% api-method-description %}
Aktualisiert die Verbindung 
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
ObjectID der Verbindung
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="" path="/api/connections/:id" %}
{% api-method-summary %}
Update
{% endapi-method-summary %}

{% api-method-description %}
Löscht die Verbindung
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
ObjectID der Verbindung
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

