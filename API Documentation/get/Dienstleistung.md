![[dienstleisung_00.png]]

#### All
`getdienstleistungall`
![[dienstleisung_02.png]]
```json  title:"Beispiel Ausgabe"
[
  {
    "PK_Dienstleistung": 1,
    "Beschreibung": "Serverwartung",
    "Kosten": "8.50"
  },
  {
    "PK_Dienstleistung": 2,
    "Beschreibung": "Softwareinstallation",
    "Kosten": "300.00"
  },
  {
    "PK_Dienstleistung": 3,
    "Beschreibung": "Netzwerkinstallation",
    "Kosten": "75.00"
  }
]
```
#### By Key
`getdienstleistungbykey`
![[dienstleisung_01.png]]

Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einer Dienstleistung welcher, diesen bestimmten PK hat.

```json  title:"Beispiel Ausgabe"
[
  {
    "PK_Dienstleistung": 1,
    "Beschreibung": "Serverwartung",
    "Kosten": "8.50"
  }
]
```