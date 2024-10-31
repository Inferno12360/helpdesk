![[Art_00.png]]
*Struktur von der Art Tabelle*

#### All
`getartall`
![[Art_02.png]]

```json  title:"Beispiel Ausgabe"
[
  {
    "PK_Art": 1,
    "Artname": "Wartung",
    "Beschreibung": "Regelmäßige Wartung"
  },
  {
    "PK_Art": 2,
    "Artname": "Fehlerbehebung",
    "Beschreibung": "Behebung von Softwarefehlern"
  },
  {
    "PK_Art": 3,
    "Artname": "Installation",
    "Beschreibung": "Installation neuer Hardware oder Software"
  }
]
```
#### By Key
`getartbykey`
![[Art_01.png]]

Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einer Art welcher, diesen bestimmten PK hat.

```json  title:"Beispiel Ausgabe"
[
	{
		"PK_Art": 1,
		"Artname": "Wartung",
		"Beschreibung": "Regelmäßige Wartung"
	}
]
```