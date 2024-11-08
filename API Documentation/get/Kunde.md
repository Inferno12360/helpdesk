![[Kunde_00.png]]

#### All
`getkundeall`
![[Kunde_02.png]]
```json title:"Beispiel Ausgabe"
[
  {
    "PK_Kunde": 1,
    "Kundennummer": "K001",
    "Firmenname": "Firma Alpha",
    "Email": "unicorns@rainbowland.com",
    "Passwort": "IllSmokeWeed69"
  },
  {
    "PK_Kunde": 2,
    "Kundennummer": "K002",
    "Firmenname": "Firma Beta",
    "Email": "picklemonsters@crazyworld.com",
    "Passwort": "ILikethefingerInMYass"
  }
]
```
#### By Key
`getkundebykey`
![[Kunde_01.png]]

Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einem Kunden welcher, diesen bestimmten PK hat.

```json title:"Beispiel Ausgabe"
[
  {
    "PK_Kunde": 1,
    "Kundennummer": "K001",
    "Firmenname": "Firma Alpha",
    "Email": "unicorns@rainbowland.com",
    "Passwort": "IllSmokeWeed69"
  }
]
```
