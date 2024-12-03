function revealDropdown() {
    const Drop = document.getElementById('dropdowncontent');
    const output = document.getElementById('output');

    // Toggle the dropdown visibility
    if (Drop.style.display === "block") {
        Drop.style.display = "none";
        output.innerHTML = ''; // Clear the output when closing the dropdown
    } else {
        Drop.style.display = "block";
    }
}

function toggleStatusDropdown() {
    const statusDropdown = document.getElementById('StatusDropdown');
    statusDropdown.style.display = (statusDropdown.style.display === 'block') ? 'none' : 'block';
}

function setStatus(status) {
    const statusDropdown = document.getElementById('StatusDropdown');
    statusDropdown.style.display = 'none'; // Close the dropdown
    const output = document.getElementById('output');
    output.innerHTML = `<p>Status: ${status}</p>`; // Update output with the selected status
}

function CheckboxKundeClick() {
    const output = document.getElementById('output');
    const button = document.getElementById('FilterKunde');
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    resetFilters(); // Alle Filter zurücksetzen
    button.classList.add('active'); // Den aktiven Filter hervorheben

    output.innerHTML = '<input type="text" id="SucheKunde" class="SuchFelderEingabe" placeholder="Kunde" oninput="SearchKunde()">';
}

function CheckboxTicketNrClick() {
    const output = document.getElementById('output');
    const button = document.getElementById('FilterTicketNr');
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    resetFilters();
    button.classList.add('active');

    output.innerHTML = '<input type="text" id="SucheTicketNr" class="SuchFelderEingabe" placeholder="TicketNr" oninput="SearchTicketNr()">';
}

function CheckboxTitelClick() {
    const output = document.getElementById('output');
    const button = document.getElementById('FilterTitel');
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    resetFilters();
    button.classList.add('active');

    output.innerHTML = '<input type="text" id="SucheTitel" class="SuchFelderEingabe" placeholder="Titel" oninput="SearchTitel()">';
}

function CheckboxAktBearbeiterClick() {
    const output = document.getElementById('output');
    const button = document.getElementById('FilterAktuellerBearbeiter');
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    resetFilters();
    button.classList.add('active');

    output.innerHTML = '<input type="text" id="SucheAktBearbeiter" class="SuchFelderEingabe" placeholder="Bearbeiter" oninput="SearchBearbeiter()">';
}

function CheckboxDatumClick() {
    const output = document.getElementById('output');
    const button = document.getElementById('FilterDatum');
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    resetFilters();
    button.classList.add('active');

    output.innerHTML = '<input type="date" id="SucheDatum" class="SuchFelderEingabe" oninput="SearchDatum()">';
}

function resetFilters() {
    const AlleButtons = document.getElementsByClassName('FilterBtn');
    for (let index = 0; index < AlleButtons.length; index++) {
        AlleButtons[index].classList.remove('active'); // Entferne die "active"-Markierung von allen Buttons
    }
}





function postAsync(url, data) {
    return new Promise((resolve, reject) => {
        $.post(url, data, function (response) {
            resolve(response["data"]);
        }).fail(function (error) {
            reject(error);
        });
    });
}



async function SearchKunde() {
    const kundeSearchValue = document.getElementById('SucheKunde').value; // Holen des Eingabewerts

    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall", "kunde": kundeSearchValue });
    let output = document.getElementById('Output-Tickets');
    output.innerHTML = ""; // Vorherige Ausgabe löschen

    for (let i = 0; i < data.length; i++) {
        let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
        if (Kunde.toLowerCase().includes(kundeSearchValue.toLowerCase())) {
            // Ticket-Daten abrufen
            let PK_Ticket = data[i]["PK_Ticket"];
            let Titel = data[i]["Ticket_Titel"];
            let Status = data[i]["Status_Values"][0]["Statusname"];
            let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
            let Art = data[i]["Art_Values"][0]["Artname"];
            let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
            let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
            let Ersteller = Vorname + " " + Nachname;
            let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

            let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
            output.innerHTML += ausgabe;
        }
    }
}


async function SearchTicketNr() {
    const ticketNrSearchValue = document.getElementById('SucheTicketNr').value; // Holen des Eingabewerts

    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall", "ticketNr": ticketNrSearchValue })
    let output = document.getElementById('Output-Tickets');
    output.innerHTML = ""; // Vorherige Ausgabe löschen

    for (let i = 0; i < data.length; i++) {
        let TicketNr = data[i]["PK_Ticket"];
        if (TicketNr.toString().includes(ticketNrSearchValue)) {
            // Ticket-Daten abrufen
            let PK_Ticket = data[i]["PK_Ticket"];
            let Titel = data[i]["Ticket_Titel"];
            let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
            let Status = data[i]["Status_Values"][0]["Statusname"];
            let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
            let Art = data[i]["Art_Values"][0]["Artname"];
            let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
            let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
            let Ersteller = Vorname + " " + Nachname;
            let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

            let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
            output.innerHTML += ausgabe;
        }
    }
}


async function SearchTitel() {
    const titelSearchValue = document.getElementById('SucheTitel').value; // Holen des Eingabewerts

    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall", "titel": titelSearchValue });
    let output = document.getElementById('Output-Tickets');
    output.innerHTML = ""; // Vorherige Ausgabe löschen

    for (let i = 0; i < data.length; i++) {
        let Titel = data[i]["Ticket_Titel"];
        if (Titel.toLowerCase().includes(titelSearchValue.toLowerCase())) {
            // Ticket-Daten abrufen
            let PK_Ticket = data[i]["PK_Ticket"];
            let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
            let Status = data[i]["Status_Values"][0]["Statusname"];
            let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
            let Art = data[i]["Art_Values"][0]["Artname"];
            let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
            let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
            let Ersteller = Vorname + " " + Nachname;
            let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

            let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
            output.innerHTML += ausgabe;
        }
    }
}


async function SearchBearbeiter() {
    const bearbeiterSearchValue = document.getElementById('SucheAktBearbeiter').value; // Holen des Eingabewerts

    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall", "bearbeiter": bearbeiterSearchValue });
    let output = document.getElementById('Output-Tickets');
    output.innerHTML = ""; // Vorherige Ausgabe löschen

    for (let i = 0; i < data.length; i++) {
        if (data[i]["Bearbeiter_Values"] != null && data[i]["Bearbeiter_Values"].length > 0) {
            let BearbeiterVor = data[i]["Bearbeiter_Values"][0][0][0]["Vorname"];
            if (BearbeiterVor.toLowerCase().includes(bearbeiterSearchValue.toLowerCase())) {
                // Ticket-Daten abrufen
                let PK_Ticket = data[i]["PK_Ticket"];
                let Titel = data[i]["Ticket_Titel"];
                let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
                let Status = data[i]["Status_Values"][0]["Statusname"];
                let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
                let Art = data[i]["Art_Values"][0]["Artname"];
                let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
                let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
                let Ersteller = Vorname + " " + Nachname;
                let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

                let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
                output.innerHTML += ausgabe;
            }
        }
    }
}


async function SearchDatum() {
    const datumSearchValue = document.getElementById('SucheDatum').value; // Holen des Eingabewerts

    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall", "datum": datumSearchValue });
    let output = document.getElementById('Output-Tickets');
    output.innerHTML = ""; // Vorherige Ausgabe löschen

    for (let i = 0; i < data.length; i++) {
        let Datum = data[i]["Erstelldatum"];
        if (Datum.includes(datumSearchValue)) {
            // Ticket-Daten abrufen
            let PK_Ticket = data[i]["PK_Ticket"];
            let Titel = data[i]["Ticket_Titel"];
            let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
            let Status = data[i]["Status_Values"][0]["Statusname"];
            let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
            let Art = data[i]["Art_Values"][0]["Artname"];
            let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
            let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
            let Ersteller = Vorname + " " + Nachname;
            let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

            let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
            output.innerHTML += ausgabe;
        }
    }
}

async function resetSearch() {

    // Überprüfen, ob das Element existiert
    let output = document.getElementById('Output-Tickets');
    if (output) {
        output.innerHTML = ""; // Vorherige Ausgabe löschen

        let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall" });
        for (let i = 0; i < data.length; i++) {
            let PK_Ticket = data[i]["PK_Ticket"];
            let Titel = data[i]["Ticket_Titel"];
            let Kunde = data[i]["Kunde_Values"][0]["Firmenname"];
            let Status = data[i]["Status_Values"][0]["Statusname"];
            let Prio = data[i]["Priorität_Values"][0]["Prioritätsname"];
            let Art = data[i]["Art_Values"][0]["Artname"];
            let Vorname = data[i]["Mitarbeiter_Values"][0]["Vorname"];
            let Nachname = data[i]["Mitarbeiter_Values"][0]["Nachname"];
            let Ersteller = Vorname + " " + Nachname;
            let Erstelldatum = new Date(Date.parse(data[i]["Erstelldatum"])).toISOString().substring(0, 10);

            let ausgabe = `<div class="grid-EinTicket">
                                <input type="text" class="TempL" value="${PK_Ticket}" id="TicketNr" readonly>
                                <input type="text" class="TempL" value="${Titel}" id="TicketTitel" readonly>
                                <input type="text" class="TempL" value="${Kunde}" id="Kunde" readonly>
                                <input type="text" class="TempL" value="${Status}" id="Status" readonly>
                                <input type="text" class="TempL" value="${Prio}" id="Prio" readonly>
                                <input type="text" class="TempL" value="${Art}" id="Art" readonly>
                                <input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>
                                <input type="text" class="TempL" value="${Ersteller}" id="Ersteller" readonly>
                                <input type="date" class="TempL" value="${Erstelldatum}" id="Erstelldatum" readonly>
                                <button type="submit" onclick="Tkt_Bearb(${PK_Ticket})" id="Bearbeiten">
                                    <img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn"/>
                                </button>
                                <button type="submit" onclick="PK_Übergeben(${PK_Ticket})" id="Rechnung">
                                    <img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn"/>
                                </button>
                                <button type="submit" onclick="DeleteTicket(${PK_Ticket})" id="Löschen">
                                    <img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" />
                                </button>
                            </div>`;
            output.innerHTML += ausgabe;
        }
    } else {
        console.error("Das Element mit der ID 'Output-Tickets' wurde nicht gefunden.");
    }
}

