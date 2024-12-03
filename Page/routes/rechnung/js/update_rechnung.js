function postAsync(url, data) {
    return new Promise((resolve, reject) => {
        $.post(url, data, function (response) {
            resolve(response["data"]);
        }).fail(function (error) {
            reject(error);
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const PK = params.get('pk');

    const updateButton = document.querySelector('.btn[value="Update"]');
    updateButton.addEventListener('click', () => { updateRechnung(PK) });
});

async function updateRechnung(PK_Rechnung) {
    const Beschreibung = document.querySelector('#ticketbeschreibung').value;
    const Bezahlungsart = document.querySelector('#bezahlungsart').value;

    const payload = {
        "Ticketbeschreibung": Beschreibung,
        "Ratenzahlung": 0,
        "FK_Bezahlungsart": parseInt(Bezahlungsart),
        "Rechnungsnr": PK_Rechnung
    }

    try {
        const response = await $.post("/helpdesk/Page/routes/api/update/rechnung/main.php", payload);

        if (response.status === "success") {
            console.log(response);
            alert("Rechnung erfolgreich aktualisiert!");
        } else {
            alert("Fehler beim Aktualisieren der Rechnung.");
        }
    } catch (error) {

    }

}


async function PrepareRechnung(PKRNR) {
    try {
        console.log(PKRNR);

        const data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungbykey", "key": PKRNR });
        console.log("API-Daten:", data);

        if (!data || data.length === 0) {
            alert("Keine Daten gefunden!");
            return;
        }

        const bezahlungsartenData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getbezahlungsartall" });
        const bezahlungsarten = bezahlungsartenData;
        console.log(bezahlungsartenData);

        const bezahlungsartSelect = document.querySelector('#bezahlungsart');
        bezahlungsarten.forEach(bezahlungsart => {
            const option = document.createElement('option');
            option.value = bezahlungsart.PK_Bezahlungsart;
            option.textContent = bezahlungsart.Artname;
            bezahlungsartSelect.appendChild(option);
        });

        const Ticketnummer = data["Ticket_Values"]["PK_Ticket"];
        const Rechnungsnummer = data["Rechnungsnr"];
        const Mitarbeiter_Vorname = data["Ticket_Values"]["Mitarbeiter_Values"]["Vorname"];
        const Mitarbeiter_Nachname = data["Ticket_Values"]["Mitarbeiter_Values"]["Nachname"];
        const Mitarbeiter = `${Mitarbeiter_Vorname} ${Mitarbeiter_Nachname}`;
        const Kunde = data["Kunde_Values"]["Firmenname"];
        const Beschreibung = data["Ticketbeschreibung"];
        const Titel = data["Ticket_Values"]["Ticket_Titel"];

        const Dienstleistungen = [];
        const Dienstleistungen_Beschreibung = [];
        const Kosten = [];
        let gesamtKosten = 0;

        data["Ticket_Values"]["Dienstleistung_Values"].forEach(dienstleistung => {
            Dienstleistungen.push(dienstleistung["PK_Dienstleistung"]);
            Dienstleistungen_Beschreibung.push(dienstleistung["Beschreibung"]);

            const kostenWert = parseFloat(dienstleistung["Kosten"]);
            Kosten.push(`${kostenWert} €`);

            gesamtKosten += kostenWert;
        });

        const Preis = `${gesamtKosten.toFixed(2)} €`;

        document.querySelector('.Placeholder-Item.item-1 input[placeholder="Rechnungsnummer"]').value = Rechnungsnummer;
        document.querySelector('.Placeholder-Item.item-1 input[placeholder="Ticketnummer"]').value = Ticketnummer;
        document.querySelector('.Placeholder-Item.item-2 input[placeholder="Mitarbeiter"]').value = Mitarbeiter;
        document.querySelector('.Placeholder-Item.item-2 input[placeholder="Kunde"]').value = Kunde;
        document.querySelector('.Placeholder-Item.item-8 input[placeholder="Tickettitel"]').value = Titel;
        document.querySelector('.Grid-Item.item-5 input[placeholder="Ticket Beschreibung"]').value = Beschreibung;
        document.querySelector('.Grid-Item.item-3 textarea[placeholder="Dienstleistungs Nr."]').value = Dienstleistungen.join("\n");
        document.querySelector('.Grid-Item.item-3 textarea[placeholder="Beschreibung der Dienstleistung"]').value = Dienstleistungen_Beschreibung.join("\n");
        document.querySelector('.Grid-Item.item-4 textarea[placeholder="Kosten der jeweiligen Dienstleistung"]').value = Kosten.join("\n");
        document.querySelector('.Grid-Item.item-7 input[placeholder="Preis"]').value = Preis;
        bezahlungsartSelect.value = data["Bezahlungsart_Values"]["PK_Bezahlungsart"];

    } catch (error) {
        console.error("Fehler beim Laden der Rechnung:", error);
    }
}


async function SetParametersOfRechnung(PK) {
    try {
        const response = await $.post("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungbykey", "key": PK });
        console.log("API Antwort:", response);

        if (response.status == "success") {
            console.log("Rechnung gefunden:", response.data);
            await PrepareRechnung(response.data.Rechnungsnr);
        } else {
            console.error("Keine Rechnung gefunden oder ungültige Antwort:", response);
        }
    } catch (error) {
        console.error("Fehler bei der API-Abfrage:", error);
    }
}
