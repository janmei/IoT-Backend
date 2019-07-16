---
description: >-
  Devices sind die Endgeräte, die mit dem System kommunizieren und diese von dem
  gesteuert wer
---

# Devices

{% api-method method="get" host="" path="/api/devices" %}
{% api-method-summary %}
Get All Devices
{% endapi-method-summary %}

{% api-method-description %}
Listet alle Geräte und deren Verbindungen auf, die in der Datenbank gefunden werden können
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

{% api-method method="get" host="" path="/api/devices/:id" %}
{% api-method-summary %}
Get One Device
{% endapi-method-summary %}

{% api-method-description %}
Listet alle Details über ein bestimmtes Gerät in der Datenbank auf
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Object ID des Devices
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "id": "5d2b8e0913047f50b4efc181",
    "dId": 0,
    "connections": [
        {
            "from": {
                "connections": [
                    "5d2e39c99daeda1a68de5411"
                ],
                "dId": 0,
                "createdAt": "2019-07-14T20:18:17.697Z",
                "updatedAt": "2019-07-16T20:55:37.476Z",
                "__v": 0,
                "id": "5d2b8e0913047f50b4efc181"
            },
            "to": {
                "connections": [
                    "5d2d0011f887990aea92c545"
                ],
                "dId": 1,
                "createdAt": "2019-07-14T20:15:01.149Z",
                "updatedAt": "2019-07-15T22:37:05.080Z",
                "__v": 0,
                "id": "5d2b8d4513047f50b4efc180"
            },
            "createdAt": "2019-07-16T20:55:37.378Z",
            "updatedAt": "2019-07-16T20:55:37.378Z",
            "__v": 0,
            "id": "5d2e39c99daeda1a68de5411"
        }
    ],    
    "createdAt": "2019-07-14T20:18:17.697Z",
    "updatedAt": "2019-07-16T20:55:37.476Z"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="" path="/api/devices" %}
{% api-method-summary %}
Create Device
{% endapi-method-summary %}

{% api-method-description %}
Erstellt ein Gerät.
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

{% api-method method="put" host="" path="/api/devices/:id" %}
{% api-method-summary %}
Update Device
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Object ID des Devices
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "id": "5d2b8e0913047f50b4efc181",
    "dId": 0,
    "connections": [
        {
            "from": {
                "connections": [
                    "5d2e39c99daeda1a68de5411"
                ],
                "dId": 0,
                "createdAt": "2019-07-14T20:18:17.697Z",
                "updatedAt": "2019-07-16T20:55:37.476Z",
                "__v": 0,
                "id": "5d2b8e0913047f50b4efc181"
            },
            "to": {
                "connections": [
                    "5d2d0011f887990aea92c545"
                ],
                "dId": 1,
                "createdAt": "2019-07-14T20:15:01.149Z",
                "updatedAt": "2019-07-15T22:37:05.080Z",
                "__v": 0,
                "id": "5d2b8d4513047f50b4efc180"
            },
            "createdAt": "2019-07-16T20:55:37.378Z",
            "updatedAt": "2019-07-16T20:55:37.378Z",
            "__v": 0,
            "id": "5d2e39c99daeda1a68de5411"
        }
    ],    
    "createdAt": "2019-07-14T20:18:17.697Z",
    "updatedAt": "2019-07-16T20:55:37.476Z"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="" path="/api/devices/:id" %}
{% api-method-summary %}
Delete Device
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Object ID des Devices
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

