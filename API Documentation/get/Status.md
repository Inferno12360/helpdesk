![[Status_00.png]]
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