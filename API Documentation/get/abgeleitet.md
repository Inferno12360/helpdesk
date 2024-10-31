![[abgeleitet_00.png]]

#### bytkey
`getabgeleitetbytkey`
![[abgeleitet_01.png]]
Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach allen Dienstleistungen welche in einem Ticket, mit diesen bestimmten PK hat.
```json  title:"Beispiel Ausgabe"
[
  [
    [
      {
        "PK_Dienstleistung": 1,
        "Beschreibung": "Serverwartung",
        "Kosten": "8.50"
      }
    ]
  ],
  [
    [
      {
        "PK_Dienstleistung": 2,
        "Beschreibung": "Softwareinstallation",
        "Kosten": "300.00"
      }
    ]
  ]
]
```