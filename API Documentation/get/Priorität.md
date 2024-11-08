![[Priorität_00.png]]
#### All
`getprioritaetall`
![[Priorität_02.png]]
```json title:"Beispiel Ausgabe"
[
  {
    "Prioritätsname": "Hoch",
    "Beschreibung": "Wichtige Aufgabe",
    "PK_Priorität": 1
  },
  {
    "Prioritätsname": "Mittel",
    "Beschreibung": "Mittelwichtige Aufgabe",
    "PK_Priorität": 2
  },
  {
    "Prioritätsname": "Niedrig",
    "Beschreibung": "Geringe Priorität",
    "PK_Priorität": 3
  },
  {
    "Prioritätsname": "Sehr Hoch",
    "Beschreibung": "Sehr dringende Aufgabe",
    "PK_Priorität": 4
  },
  {
    "Prioritätsname": "Gering",
    "Beschreibung": "Kann warten",
    "PK_Priorität": 5
  }
]
```

#### By Key
`getprioritaetbykey`
![[Priorität_01.png]]
Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einer Priorität welcher, diesen bestimmten PK hat.

```json title:"Beispiel Ausgabe"
[
  {
    "PK_Priorität": 1,
    "Prioritätsname": "Hoch",
    "Beschreibung": "Wichtige Aufgabe"
  }
]
```
