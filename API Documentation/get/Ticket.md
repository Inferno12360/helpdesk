![[Ticket_00.png]]
#### All
`getticketall`
![[Ticket_01.png]]

```json title:"Beispiel Ausgabe"
[
  {
    "PK_Ticket": 1,
    "Ticket_Titel": "Problem mit Server",
    "Beschreibung": "Server läuft nicht richtig",
    "Interne_Notiz": "Keine Notiz",
    "Interner_Status": "Offen",
    "Erstelldatum": "2024-09-01",
    "Bearbeitungsdatum": "2024-09-02",
    "Status_Values": [
      {
        "PK_Status": 1,
        "Statusname": "Offen",
        "Farbe": "Rot",
        "Beschreibung": "Ticket ist offen"
      }
    ],
    "Priorität_Values": [
      {
        "PK_Priorität": 1,
        "Prioritätsname": "Hoch",
        "Beschreibung": "Wichtige Aufgabe"
      }
    ],
    "Art_Values": [
      {
        "PK_Art": 1,
        "Artname": "Wartung",
        "Beschreibung": "Regelmäßige Wartung"
      }
    ],
    "Mitarbeiter_Values": [
      {
        "PK_Mitarbeiter": 1,
        "Vorname": "Max",
        "Nachname": "Mustermann",
        "Position": "Techniker",
        "Festnetznummer": "030-1234567",
        "Mobilnummer": "0176-12345678",
        "Email": "max@techcorp.de",
        "Ort_Values": [
          {
            "PK_Ort": 1,
            "Stadt": "Berlin",
            "PLZ": "10115",
            "Straße": "Hauptstraße",
            "Hausnummer": "10"
          }
        ],
        "Rechtegruppe_Values": [
          {
            "PK_Rechtegruppe": 1,
            "Administrationsrechte": 1,
            "Bestelllimit": "1000.00",
            "Helpdesk_Fernwartung": 1
          }
        ],
        "EigeneFirma": [
          {
            "PK_EigeneFirma": 1,
            "Firmenename": "TechCorp"
          }
        ]
      }
    ],
    "Kunde_Values": [
      {
        "PK_Kunde": 1,
        "Kundennummer": "K001",
        "Firmenname": "Firma Alpha"
      }
    ]
  },...
```
#### By Key
`getticketbykey`
![[Ticket_02.png]]
Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einem Ticket welches, diesen bestimmten PK hat.

```json title:"Beispiel Ausgabe"
[
  {
    "PK_Ticket": 3,
    "Ticket_Titel": "Netzwerkinstallation",
    "Beschreibung": "Neues Netzwerk muss installiert werden",
    "Interne_Notiz": "Kabel fehlen",
    "Interner_Status": "Geschlossen",
    "Erstelldatum": "2024-09-03",
    "Bearbeitungsdatum": "2024-09-04",
    "Status_Values": [
      {
        "PK_Status": 3,
        "Statusname": "Geschlossen",
        "Farbe": "Grün",
        "Beschreibung": "Ticket geschlossen"
      }
    ],
    "Priorität_Values": [
      {
        "PK_Priorität": 3,
        "Prioritätsname": "Niedrig",
        "Beschreibung": "Geringe Priorität"
      }
    ],
    "Art_Values": [
      {
        "PK_Art": 3,
        "Artname": "Installation",
        "Beschreibung": "Installation neuer Hardware oder Software"
      }
    ],
    "Mitarbeiter_Values": [
      {
        "PK_Mitarbeiter": 3,
        "Vorname": "Hans",
        "Nachname": "Müller",
        "Position": "Entwickler",
        "Festnetznummer": "089-5555555",
        "Mobilnummer": "0176-55555555",
        "Email": "hans@edusoft.de",
        "Ort_Values": [
          {
            "PK_Ort": 3,
            "Stadt": "München",
            "PLZ": "80331",
            "Straße": "Platz",
            "Hausnummer": "12"
          }
        ],
        "Rechtegruppe_Values": [
          {
            "PK_Rechtegruppe": 1,
            "Administrationsrechte": 1,
            "Bestelllimit": "1000.00",
            "Helpdesk_Fernwartung": 1
          }
        ],
        "EigeneFirma": [
          {
            "PK_EigeneFirma": 3,
            "Firmenename": "EduSoft"
          }
        ]
      }
    ],
    "Kunde_Values": [
      {
        "PK_Kunde": 3,
        "Kundennummer": "K003",
        "Firmenname": "Firma Gamma"
      }
    ]
  }
]
```