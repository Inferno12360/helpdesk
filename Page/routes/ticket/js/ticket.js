function postAsync(url, data) {
    return new Promise((resolve, reject) => {
        $.post(url, data, function (response) {
            resolve(response["data"]);
        }).fail(function (error) {
            reject(error);
        });
    });
}


async function AuswahlFuellen(PK) {
    let Navi = loadTemplate("/helpdesk/Page/template/navbar_logged_in.html", "Navigation")
    // Kunde
    let kundeData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getkundeall" });

    let kundeOutput = document.getElementById('Kunde');
    let kundeDropInfos = '<option value="placeholder">- Kunde wählen -</option>';
    for (let i = 0; i < kundeData.length; i++) {
        kundeDropInfos += `<option value="${kundeData[i]["PK_Kunde"]}">${kundeData[i]["Firmenname"]}</option>`;
    }
    kundeOutput.innerHTML += kundeDropInfos;

    // Status
    let statusData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getstatusall" });
    let statusOutput = document.getElementById('Status');
    let statusDropInfos = '<option value="placeholder">- Choose Option -</option>';
    for (let i = 0; i < statusData.length; i++) {
        statusDropInfos += `<option value="${statusData[i]["PK_Status"]}">${statusData[i]["Statusname"]}</option>`;
    }
    statusOutput.innerHTML += statusDropInfos;

    // Priorität
    let prioritaetData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getprioritaetall" });
    let prioritaetOutput = document.getElementById('Priorität');
    let prioDropInfos = '<option value="placeholder">- Choose Option -</option>';
    for (let i = 0; i < prioritaetData.length; i++) {
        prioDropInfos += `<option value="${prioritaetData[i]["PK_Priorität"]}">${prioritaetData[i]["Prioritätsname"]}</option>`;
    }
    prioritaetOutput.innerHTML += prioDropInfos;

    // Art
    let artData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getartall" });
    let artOutput = document.getElementById('Art');
    let artDropInfos = '<option value="placeholder">- Choose Option -</option>';
    for (let i = 0; i < artData.length; i++) {
        artDropInfos += `<option value="${artData[i]["PK_Art"]}">${artData[i]["Artname"]}</option>`;
    }
    artOutput.innerHTML += artDropInfos;

    // Mitarbeiter
    let mitarbeiterData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getmitarbeiterall" });
    let mitarbeiterOutput = document.getElementById('Ersteller');
    let mitarbeiterDropInfos = '<option value="placeholder">- Ersteller wählen -</option>';
    for (let i = 0; i < mitarbeiterData.length; i++) {
        mitarbeiterDropInfos += `<option value="${mitarbeiterData[i]["PK_Mitarbeiter"]}">${mitarbeiterData[i]["Vorname"]} ${mitarbeiterData[i]["Nachname"]}</option>`;
    }
    mitarbeiterOutput.innerHTML += mitarbeiterDropInfos;

    // Dienstleistungen
    let dienstleistungData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getdienstleistungall" });
    let dienstleistungOutput = document.getElementById('AuswählbareDienstleistungen');
    let dienstleistungDropInfos = "";

    for (let i = 0; i < dienstleistungData.length; i++) {
        dienstleistungDropInfos += `
        <div>
            <input type="text" id="DienstID" value="${dienstleistungData[i]["PK_Dienstleistung"]}" readonly="">
            <input type="text" id="DienstBeschreibung" value="${dienstleistungData[i]["Beschreibung"]}" readonly="">
            <button onclick="SetDienstleistung(${dienstleistungData[i]["PK_Dienstleistung"]},'${dienstleistungData[i]["Beschreibung"]}',${dienstleistungData[i]["Kosten"]})">-></button>
        </div>`;
    }
    dienstleistungOutput.innerHTML += dienstleistungDropInfos;

    // Ticket Information
    GetTicketInfo(PK);
}


async function GetTicketInfo(PK) {
    const data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall" })
    for (let i = 0; i <= data.length - 1; i++) {
        if (data[i]["PK_Ticket"] == PK) {
            let Kunde = data[i]["Kunde_Values"]["PK_Kunde"];
            let TicketNr = data[i]["PK_Ticket"];
            let Titel = data[i]["Ticket_Titel"];
            let Status = data[i]["Status_Values"]["PK_Status"]
            let Prio = data[i]["Priorität_Values"]["PK_Priorität"]
            let Art = data[i]["Art_Values"]["PK_Art"]
            let VornameE = data[i]["Mitarbeiter_Values"]["Vorname"];
            let NachnameE = data[i]["Mitarbeiter_Values"]["Nachname"];
            let Ersteller = data[i]["Mitarbeiter_Values"]["PK_Mitarbeiter"];
            let Erstelldatum = data[i]["Erstelldatum"];
            Erstelldatum = new Date(Date.parse(Erstelldatum));
            let BearbeiterValue = data[i]["Bearbeiter_Values"];

            let Beschreibung = data[i]["Beschreibung"];
            let ausgewählteDienstleistung = data[i]["Dienstleistung_Values"]
            let Interne_Notiz = data[i]["Interne_Notiz"];
            let Interner_Status = data[i]["Interner_Status"];


            KundeInput = document.getElementById('Kunde');
            KundeInput.value = Kunde;
            TicketNrInput = document.getElementById('TicketNr');
            TicketNrInput.value = TicketNr;
            TitelInput = document.getElementById('Titel');
            TitelInput.value = Titel;

            StatusInput = document.getElementById('Status');
            StatusInput.value = Status;
            PrioInput = document.getElementById('Priorität');
            PrioInput.value = Prio;
            ArtInput = document.getElementById('Art');
            ArtInput.value = Art;
            ErstellerInput = document.getElementById('Ersteller');
            ErstellerInput.value = Ersteller;
            ErstelldatumInput = document.getElementById("Erstelldatum")
            ErstelldatumInput.value = Erstelldatum.toISOString().substring(0, 10);
            ErstellzeitInput = document.getElementById("Erstellzeit")
            ErstellzeitInput.value = Erstelldatum.toISOString().substring(11, 16);


            for (let Bear = 0; Bear <= BearbeiterValue.length - 1; Bear++) {

                BearbeiterID = BearbeiterValue[0][0]["PK_Mitarbeiter"];
                BearbeiterV = BearbeiterValue[0][0]["Vorname"];
                BearbeiterN = BearbeiterValue[0][0]["Nachname"];
                Bearbeiter = BearbeiterV + " " + BearbeiterN;
                //let Bearbeiterdatum = BearbeiterValue[0][0]["Erstelldatum"];
                //Erstelldatum = new Date(Date.parse(Erstelldatum));

                const container = document.getElementById('bearbeiter-container');
                const newField = document.createElement('div');
                newField.classList.add('bearbeiter-feld');
                newField.innerHTML = '<div class="bearbeiter-feld">' +
                    '<select name="Bearbeiter" id="Bearbeiter">' +
                    '<option value="' + BearbeiterID + '">' + Bearbeiter + '</option>' +
                    '</select>' +
                    '<div class="grid-DateTime">' +
                    '<input type="date" id="Bearbeitungsdatum" placeholder="Bearbeitungsdatum"><input type="time" id="Bearbeitungszeit" placeholder="Bearbeitungszeit">' +
                    '</div>' +
                    '</div>';
                const secondNode = container.children[1];
                if (secondNode == undefined) {
                    container.appendChild(newField);
                } else {
                    container.insertBefore(newField, secondNode);
                }
            }

            BeschreibungInput = document.getElementById('Beschreibung');
            BeschreibungInput.value = Beschreibung;

            for (let Dienst = 0; Dienst <= ausgewählteDienstleistung.length - 1; Dienst++) {

                let DienstNr = ausgewählteDienstleistung[Dienst][0]["PK_Dienstleistung"]
                Dienstleistungen.push(DienstNr);
                let DienstBeschreibung = ausgewählteDienstleistung[Dienst][0]["Beschreibung"]
                let DienstKosten = ausgewählteDienstleistung[Dienst][0]["Kosten"]

                let output = document.getElementById('AusgewählteDienstleistungen');
                let ausgewählteDienstleistungen = "";
                ausgewählteDienstleistungen += '<div>'
                ausgewählteDienstleistungen += '<input type="text" id="DienstID" value="' + DienstNr + '" readonly=""> <style>#DienstID{width: 40px;}</style>'
                ausgewählteDienstleistungen += '<input type="text" id="DienstBeschreibung" value="' + DienstBeschreibung + '" readonly="">'
                ausgewählteDienstleistungen += '<input type="text" id="DienstPreis" value="' + DienstKosten + '€" readonly="">'
                ausgewählteDienstleistungen += '<button onclick="DeleteDienstleistung(' + DienstNr + ')">x</button>'
                ausgewählteDienstleistungen += '</div>'

                output.innerHTML += ausgewählteDienstleistungen;
            }

            Interne_NotizInput = document.getElementById('Interne_Notiz');
            Interne_NotizInput.value = Interne_Notiz;
            Interner_StatusInput = document.getElementById('Interner_Status');
            Interner_StatusInput.value = Interner_Status;

            const button = document.getElementById('Button')
            button.innerHTML = "Ticket updaten";
        }
    }


}

let Dienstleistungen = []

function SetDienstleistung(IDvalue, Beschreibungvalue, Kostenvalue) {
    let PK_Dienstleistung = IDvalue;
    Dienstleistungen.push(PK_Dienstleistung)

    let output = document.getElementById('AusgewählteDienstleistungen');
    let ausgewählteDienstleistungen = '<div>'
    ausgewählteDienstleistungen += '<input type="text" id="DienstID" value="' + IDvalue + '" readonly=""> <style>#DienstID{width: 40px;}</style>'
    ausgewählteDienstleistungen += '<input type="text" id="DienstBeschreibung" value="' + Beschreibungvalue + '" readonly="">'
    ausgewählteDienstleistungen += '<input type="text" id="DienstPreis" value="' + Kostenvalue + '€" readonly="">'
    ausgewählteDienstleistungen += '<button onclick="DeleteDienstleistung(' + IDvalue + ')">x</button>'
    ausgewählteDienstleistungen += '</div>'

    output.innerHTML += ausgewählteDienstleistungen;
}

async function SetTicket() {

    let Kunde = document.getElementById('Kunde')
    let selectedKunde = Kunde.value;
    let Titel = document.getElementById('Titel').value
    let Status = document.getElementById('Status')
    let selectedStatus = Status.value;
    let Prio = document.getElementById('Priorität')
    let selectedPrio = Prio.value;
    let Art = document.getElementById('Art')
    let selectedArt = Art.value;
    let Ersteller = document.getElementById('Ersteller')
    let selectedErsteller = Ersteller.value;
    let Erstelldatum = document.getElementById('Erstelldatum').value
    let Erstelluhrzeit = document.getElementById('Erstellzeit').value
    let datetimeString = Erstelldatum + "T" + Erstelluhrzeit;
    let dateTime = formatDateForMariaDB(new Date(datetimeString));
    let Beschreibung = document.getElementById('Beschreibung').value

    let Interne_Notiz = document.getElementById('Interne_Notiz').value
    let Interner_Status = document.getElementById('Interner_Status').value

    const button = document.getElementById('Button');

    if (button.innerText === 'Ticket erstellen') {

        let TicketSet = await postAsync("/helpdesk/Page/routes/api/api.php", {
            "method": "setticketmain",
            "Ticket_Titel": Titel,
            "Beschreibung": Beschreibung,
            "InterneNotiz": Interne_Notiz,
            "InternerStatus": Interner_Status,
            "Erstelldatum": dateTime,
            "Bearbeitungsdatum": dateTime,
            "FK_Status": selectedStatus,
            "FK_Prioritaet": selectedPrio,
            "FK_Art": selectedArt,
            "FK_Mitarbeiter": selectedErsteller,
            "fk_dienstleistung": Dienstleistungen,
            "FK_Kunde": selectedKunde


        })

    }
    else if (button.innerText === 'Ticket updaten') {

        const params = new URLSearchParams(window.location.search);
        const aktPK = params.get('pk');

        let TicketUpd = await postAsync("/helpdesk/Page/routes/api/api.php", {
            "method": "updateticketmain", "PK_Ticket": aktPK,
            "Ticket_Titel": Titel,
            "Beschreibung": Beschreibung,
            "InterneNotiz": Interne_Notiz,
            "InternerStatus": Interner_Status,
            "Erstelldatum": dateTime,
            "Bearbeitungsdatum": dateTime,
            "FK_Status": selectedStatus,
            "FK_Prioritaet": selectedPrio,
            "FK_Art": selectedArt,
            "FK_Mitarbeiter": selectedErsteller,
            "Dienstleistungen": Dienstleistungen,
            "FK_Kunde": selectedKunde


        })

    }
}

function formatDateForMariaDB(date) {
    if (!(date instanceof Date)) {
        throw new Error("Invalid Date object");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function DeleteDienstleistung(DienstNr) {
    Dienstleistungen = Dienstleistungen.filter(num => num !== DienstNr)
    let output = document.getElementById('AusgewählteDienstleistungen');
    output.replaceChildren();
    for (let i = 0; i <= Dienstleistungen.length - 1; i++) {

        let dienstleistungData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getdienstleistungbykey", "key": Dienstleistungen[i] });

        let DienstNr = dienstleistungData["PK_Dienstleistung"]
        let DienstBeschreibung = dienstleistungData["Beschreibung"]
        let DienstKosten = dienstleistungData["Kosten"]


        let ausgewählteDienstleistungen = "";
        ausgewählteDienstleistungen += '<div>'
        ausgewählteDienstleistungen += '<input type="text" id="DienstID" value="' + DienstNr + '" readonly=""> <style>#DienstID{width: 40px;}</style>'
        ausgewählteDienstleistungen += '<input type="text" id="DienstBeschreibung" value="' + DienstBeschreibung + '" readonly="">'
        ausgewählteDienstleistungen += '<input type="text" id="DienstPreis" value="' + DienstKosten + '€" readonly="">'
        ausgewählteDienstleistungen += '<button onclick="DeleteDienstleistung(' + DienstNr + ')">x</button>'
        ausgewählteDienstleistungen += '</div>'

        output.innerHTML += ausgewählteDienstleistungen;
    }
}

// Beispiel für asynchrone Anfrage, um die Dienstleistungsdaten zu holen
async function fetchDienstleistungen() {
    return await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getdienstleistungall" });
}

// Funktion zum Filtern und Anzeigen der Dienstleistungen
async function filterDienstleistungen() {
    // Hole den eingegebenen Suchbegriff
    const searchTerm = document.getElementById('SucheDienstleistung').value.toLowerCase();

    // Wenn der Suchbegriff leer ist, zeige alle Dienstleistungen an
    if (searchTerm === "") {
        // Hol die gesamte Dienstleistungsdaten, wenn das Suchfeld leer ist
        const dienstleistungData = await fetchDienstleistungen();
        displayDienstleistungen(dienstleistungData);  // Alle Dienstleistungen anzeigen
        return; // Abbrechen, um den Filterprozess nicht weiter auszuführen
    }

    // Hole die Dienstleistungsdaten
    const dienstleistungData = await fetchDienstleistungen();

    // Filtere die Dienstleistungen basierend auf dem Suchbegriff
    const filteredData = dienstleistungData.filter(dienstleistung => {
        // Suche nach DienstID oder DienstBeschreibung (beide Felder werden überprüft)
        return dienstleistung["PK_Dienstleistung"].toString().includes(searchTerm) ||
            dienstleistung["Beschreibung"].toLowerCase().includes(searchTerm);
    });

    // Zeige die gefilterten Dienstleistungen im Div an
    displayDienstleistungen(filteredData);
}

// Funktion, die die Dienstleistungen anzeigt
function displayDienstleistungen(dienstleistungData) {
    let dienstleistungDropInfos = "";
    dienstleistungData.forEach(dienstleistung => {
        dienstleistungDropInfos += `
        <div>
          <input type="text" id="DienstID" value="${dienstleistung["PK_Dienstleistung"]}" readonly="">
          <input type="text" id="DienstBeschreibung" value="${dienstleistung["Beschreibung"]}" readonly="">
          <button onclick="SetDienstleistung(${dienstleistung["PK_Dienstleistung"]},'${dienstleistung["Beschreibung"]}',${dienstleistung["Kosten"]})">-></button>
        </div>`;
    });

    // Zeige die gefilterten Dienstleistungen im Div an
    document.getElementById('AuswählbareDienstleistungen').innerHTML = dienstleistungDropInfos;
}