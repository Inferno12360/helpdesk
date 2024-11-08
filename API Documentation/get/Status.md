![[Status_00.png]]
#### All
`getstatusall`
![[Status_02.png]]
```json title:"Beispiel Ausgabe"
[
  {
    "PK_Status": 1,
    "Statusname": "Offen",
    "Farbe": "Rot",
    "Beschreibung": "Ticket ist offen"
  },
  {
    "PK_Status": 2,
    "Statusname": "In Bearbeitung",
    "Farbe": "Gelb",
    "Beschreibung": "Ticket in Bearbeitung"
  },
  {
    "PK_Status": 3,
    "Statusname": "Geschlossen",
    "Farbe": "Grün",
    "Beschreibung": "Ticket geschlossen"
  },
  {
    "PK_Status": 4,
    "Statusname": "Wartend",
    "Farbe": "Blau",
    "Beschreibung": "Wartet auf Antwort"
  },
  {
    "PK_Status": 5,
    "Statusname": "Archiviert",
    "Farbe": "Grau",
    "Beschreibung": "Ticket archiviert"
  }
]
```
#### By Key
`getstatusbykey`
![[Status_01.png]]

Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einem Status welcher, diesen bestimmten PK hat.

```json title:"Beispiel Ausgabe"
[
  {
    "PK_Status": 1,
    "Statusname": "Offen",
    "Farbe": "Rot",
    "Beschreibung": "Ticket ist offen"
  }
]
```