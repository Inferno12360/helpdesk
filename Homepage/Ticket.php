<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket System - TLJMLT GmbH</title>
    <link rel="stylesheet" href="Startseite.css">
</head>
<body>
    <?php include 'navbar.html'; ?>
    <h1 class="center-text"><b>Ticket</b></h1>
    <main>
        <section class="hero">
            <h2>Ticket System</h2>
            <p>Erstellen Sie ein neues Ticket oder aktualisieren Sie ein bestehendes Ticket in unserem System.</p>
        </section>

        <section class="features">
            <h2>Ticket Details</h2>
            <div class="feature-grid">

                <div class="feature-item">
                    <label for="TicketNr">Ticket Nummer:</label>
                    <input type="text" id="TicketNr" placeholder="TicketNr" readonly>
                </div>
                <div class="feature-item">
                    <label for="Titel">Titel:</label>
                    <input type="text" id="Titel" placeholder="Titel">
                </div>

                <div class="feature-item">
                    <label for="Status">Status:</label>
                    <select id="Status" class="styled-select">
                        <option value="placeholder">- Wähle Option -</option>
                        <option value="Open">Offen</option>
                        <option value="In Progress">In Bearbeitung</option>
                        <option value="Closed">Geschlossen</option>
                    </select>
                </div>
               

                <div class="feature-item">
                    <label for="Art">Art:</label>
                    <select id="Art" class="styled-select">
                        <option value="placeholder">- Choose Option -</option>
                        <option value="Neuinstallation">Neuinstallation</option>
                        <option value="Reparatur">Reparatur</option>
                        <option value="Standard-Fehler">Standard-Fehler</option>
                    </select>
                </div>
            </div>

            <div class="feature-grid">
                <div class="feature-item">
                    <label for="Kunde">Kunde:</label>
                    <input type="text" id="Kunde" placeholder="Kunde">
                </div>

                <div class="feature-item">
                    <label for="Erstelldatum">Erstelldatum:</label>
                    <input type="datetime-local" id="Erstelldatum">
                </div>

                <div class="feature-item">
                    <label for="Bearbeitungsdatum">Bearbeitungsdatum:</label>
                    <input type="datetime-local" id="Bearbeitungsdatum">
                </div>

                <div class="feature-item">
                    <label for="Beschreibung">Beschreibung:</label>
                    <input type="text" id="Beschreibung" placeholder="Beschreibung">
                </div>

                <div class="feature-item">
                    <label for="Interne_Notiz">Interne Notiz:</label>
                    <input type="text" id="Interne_Notiz" placeholder="Interne Notiz">
                </div>

                <div class="feature-item">
                    <label for="Interner_Status">Interner Status:</label>
                    <input type="text" id="Interner_Status" placeholder="Interner Status">
                </div>
            </div>
        </section>
    </main>
    <?php include 'footer.html'; ?>
</body>
</html>
