![[Art_00.png]]
*Struktur von der Art Tabelle*

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