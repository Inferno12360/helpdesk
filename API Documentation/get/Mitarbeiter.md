![[Mitarbeiter_00.png]]
#### All
`getmitarbeiterall`
![[Mitarbeiter_01.png]]

```json  title:"Beispiel Ausgabe"
[
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
  },
  {
    "PK_Mitarbeiter": 2,
    "Vorname": "Erika",
    "Nachname": "Musterfrau",
    "Position": "Sekretärin",
    "Festnetznummer": "040-9876543",
    "Mobilnummer": "0176-98765432",
    "Email": "erika@meditech.de",
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
    "EigeneFirma": [
      {
        "PK_EigeneFirma": 2,
        "Firmenename": "MediTech"
      }
    ]
  }
]
```
#### By Key
`getmitarbeiterbykey`
![[Mitarbeiter_02.png]]
Durch das Feld "key" (markiert durch Rot im Bild) sucht dieser Endpunkt nach einem Mitarbeiter welcher, diesen bestimmten PK hat.

``` json title:"Beispiel Ausgabe"
[
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
]
```

#### By Name
`getmitarbeiterbyname`
![[Mitarbeiter_03.png]]
Durch das Feld "name" (markiert durch Rot im Bild) sucht dieser Endpunkt nach allen Mitarbeitern welche, diesen Nachnamen besitzen.

```json title:"Beispiel Ausgabe"
[
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
  },
  {
    "PK_Mitarbeiter": 2,
    "Vorname": "Erika",
    "Nachname": "Mustermann",
    "Position": "Sekretärin",
    "Festnetznummer": "040-9876543",
    "Mobilnummer": "0176-98765432",
    "Email": "erika@meditech.de",
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
    "EigeneFirma": [
      {
        "PK_EigeneFirma": 2,
        "Firmenename": "MediTech"
      }
    ]
  }
]
```