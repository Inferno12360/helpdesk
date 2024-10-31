![[bezahlungsart_00.png]]

#### By Key
getbezahlungsabykey
![[bezahlungsart_01.png]]

Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einer Bezahlungsart welcher, diesen bestimmten PK hat.

```json  title:"Beispiel Ausgabe"
[
  {
    "PK_Bezahlungsart": 1,
    "Beschreibung": "Zahlung per Kreditkarte",
    "Artname": "Kreditkarte"
  }
]
```