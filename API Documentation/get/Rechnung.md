![[Rechnung_00.png]]
#### All
`getrechnungall`
![[Rechnung_01.png]]
```json  title:"Beispiel Ausgabe"
[
  {
    "Rechnungsnr": "R001",
    "Ticketbeschreibung": "Problem mit Server",
    "Abrechnung": "Rechnung für Ticket 1",
    "Ratenzahlung": 0,
    "Kunde_Values": [
      {
        "PK_Kunde": 2,
        "Kundennummer": "K002",
        "Firmenname": "Firma Beta",
        "Email": "picklemonsters@crazyworld.com",
        "Passwort": "ILikethefingerInMYass"
      }
    ],
    "Ticket_Values": [
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
            "Passwort": "B0neP@rt3Napoleon",
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
            "Firma": [
              {
                "PK_Kunde": 1,
                "Kundennummer": "K001",
                "Firmenname": "Firma Alpha",
                "Email": "unicorns@rainbowland.com",
                "Passwort": "IllSmokeWeed69"
              }
            ]
          }
        ],
        "Bearbeiter_Values": [
          [
            [
              {
                "PK_Mitarbeiter": 1,
                "Vorname": "Max",
                "Nachname": "Mustermann",
                "Position": "Techniker",
                "Festnetznummer": "030-1234567",
                "Mobilnummer": "0176-12345678",
                "Email": "max@techcorp.de",
                "Passwort": "B0neP@rt3Napoleon",
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
                "Firma": [
                  {
                    "PK_Kunde": 1,
                    "Kundennummer": "K001",
                    "Firmenname": "Firma Alpha",
                    "Email": "unicorns@rainbowland.com",
                    "Passwort": "IllSmokeWeed69"
                  }
                ]
              }
            ]
          ],
          [
            [
              {
                "PK_Mitarbeiter": 2,
                "Vorname": "Erika",
                "Nachname": "Mustermann",
                "Position": "Sekretärin",
                "Festnetznummer": "040-9876543",
                "Mobilnummer": "0176-98765432",
                "Email": "erika@meditech.de",
                "Passwort": "G3ngh1sKhan_12!",
                "Ort_Values": [
                  {
                    "PK_Ort": 2,
                    "Stadt": "Hamburg",
                    "PLZ": "20095",
                    "Straße": "Nebenstraße",
                    "Hausnummer": "5"
                  }
                ],
                "Rechtegruppe_Values": [
                  {
                    "PK_Rechtegruppe": 2,
                    "Administrationsrechte": 0,
                    "Bestelllimit": "500.00",
                    "Helpdesk_Fernwartung": 0
                  }
                ],
                "Firma": [
                  {
                    "PK_Kunde": 2,
                    "Kundennummer": "K002",
                    "Firmenname": "Firma Beta",
                    "Email": "picklemonsters@crazyworld.com",
                    "Passwort": "ILikethefingerInMYass"
                  }
                ]
              }
            ]
          ]
        ],
        "Dienstleistung_Values": [
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
        ],
        "Kunde_Values": [
          {
            "PK_Kunde": 2,
            "Kundennummer": "K002",
            "Firmenname": "Firma Beta",
            "Email": "picklemonsters@crazyworld.com",
            "Passwort": "ILikethefingerInMYass"
          }
        ]
      }
    ],
    "Bezahlungsart_Values": [
      {
        "PK_Bezahlungsart": 1,
        "Beschreibung": "Zahlung per Kreditkarte",
        "Artname": "Kreditkarte"
      }
    ]
  },
  ...
]
```

#### By Key
`getrechnungbykey`
![[Rechnung_02.png]]
Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einer Rechnung welche, diesen bestimmten PK hat.

```json title:"Beispiel Ausgabe"
[
  {
    "Rechnungsnr": "R001",
    "Ticketbeschreibung": "Problem mit Server",
    "Abrechnung": "Rechnung für Ticket 1",
    "Ratenzahlung": 0,
    "Kunde_Values": [
      {
        "PK_Kunde": 2,
        "Kundennummer": "K002",
        "Firmenname": "Firma Beta",
        "Email": "picklemonsters@crazyworld.com",
        "Passwort": "ILikethefingerInMYass"
      }
    ],
    "Ticket_Values": [
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
            "Passwort": "B0neP@rt3Napoleon",
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
            "Firma": [
              {
                "PK_Kunde": 1,
                "Kundennummer": "K001",
                "Firmenname": "Firma Alpha",
                "Email": "unicorns@rainbowland.com",
                "Passwort": "IllSmokeWeed69"
              }
            ]
          }
        ],
        "Bearbeiter_Values": [
          [
            [
              {
                "PK_Mitarbeiter": 1,
                "Vorname": "Max",
                "Nachname": "Mustermann",
                "Position": "Techniker",
                "Festnetznummer": "030-1234567",
                "Mobilnummer": "0176-12345678",
                "Email": "max@techcorp.de",
                "Passwort": "B0neP@rt3Napoleon",
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
                "Firma": [
                  {
                    "PK_Kunde": 1,
                    "Kundennummer": "K001",
                    "Firmenname": "Firma Alpha",
                    "Email": "unicorns@rainbowland.com",
                    "Passwort": "IllSmokeWeed69"
                  }
                ]
              }
            ]
          ],
          [
            [
              {
                "PK_Mitarbeiter": 2,
                "Vorname": "Erika",
                "Nachname": "Mustermann",
                "Position": "Sekretärin",
                "Festnetznummer": "040-9876543",
                "Mobilnummer": "0176-98765432",
                "Email": "erika@meditech.de",
                "Passwort": "G3ngh1sKhan_12!",
                "Ort_Values": [
                  {
                    "PK_Ort": 2,
                    "Stadt": "Hamburg",
                    "PLZ": "20095",
                    "Straße": "Nebenstraße",
                    "Hausnummer": "5"
                  }
                ],
                "Rechtegruppe_Values": [
                  {
                    "PK_Rechtegruppe": 2,
                    "Administrationsrechte": 0,
                    "Bestelllimit": "500.00",
                    "Helpdesk_Fernwartung": 0
                  }
                ],
                "Firma": [
                  {
                    "PK_Kunde": 2,
                    "Kundennummer": "K002",
                    "Firmenname": "Firma Beta",
                    "Email": "picklemonsters@crazyworld.com",
                    "Passwort": "ILikethefingerInMYass"
                  }
                ]
              }
            ]
          ]
        ],
        "Dienstleistung_Values": [
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
        ],
        "Kunde_Values": [
          {
            "PK_Kunde": 2,
            "Kundennummer": "K002",
            "Firmenname": "Firma Beta",
            "Email": "picklemonsters@crazyworld.com",
            "Passwort": "ILikethefingerInMYass"
          }
        ]
      }
    ],
    "Bezahlungsart_Values": [
      {
        "PK_Bezahlungsart": 1,
        "Beschreibung": "Zahlung per Kreditkarte",
        "Artname": "Kreditkarte"
      }
    ]
  }
]
```