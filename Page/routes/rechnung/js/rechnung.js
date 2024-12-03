function postAsync(url, data) {
    return new Promise((resolve, reject) => {
        $.post(url, data, function (response) {
            resolve(response["data"]);
        }).fail(function (error) {
            reject(error);
        });
    });
}

function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');

    const title = "Rechnung";
    const currentDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('de-DE', options).replace(/\./g, '.');

    doc.setFontSize(22);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(formattedDate, 269, 10, { align: 'right' });

    const rechnungsnummer = document.querySelector("input[placeholder='Rechnungsnummer']").value;
    const ticketnummer = document.querySelector("input[placeholder='Ticketnummer']").value;
    const kunde = document.querySelector("input[placeholder='Kunde']").value;
    const tickettitel = document.querySelector("input[placeholder='Tickettitel']").value;
    const ticketbeschreibung = document.querySelector("input[placeholder='Ticket Beschreibung']").value;
    const dienstleistungen = document.querySelector("textarea[placeholder='Dienstleistungs Nr.']").value;
    const beschreibungen = document.querySelector("textarea[placeholder='Beschreibung der Dienstleistung']").value;
    const kosten = document.querySelector("textarea[placeholder='Kosten der jeweiligen Dienstleistung']").value;
    const bezahlungsart = document.querySelector("input[placeholder='Bezahlungsart']").value;
    const preis = document.querySelector("input[placeholder='Preis']").value;

    const anmerkungen = document.getElementById("notes").value || "Keine Anmerkungen angegeben.";

    const table1Widths = [40, 40, 45, 65];
    const table1Headers = [['Rechnungsnummer', 'Ticketnummer', 'Kunde', 'Titel']];
    const table1Data = [
        [rechnungsnummer, ticketnummer, kunde, tickettitel]
    ];

    doc.autoTable({
        startY: 20,
        head: table1Headers,
        body: table1Data,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: table1Widths[0] },
            1: { cellWidth: table1Widths[1] },
            2: { cellWidth: table1Widths[2] },
            3: { cellWidth: table1Widths[3] }
        },
    });

    const tableTicketbeschreibungHeaders = [['Ticketbeschreibung']];
    const tableTicketbeschreibungData = [[ticketbeschreibung]];

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: tableTicketbeschreibungHeaders,
        body: tableTicketbeschreibungData,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: 250 }
        }
    });

    const table2Widths = [40, 150, 25];
    const table2Headers = [['Dienstleistung', 'Beschreibung', 'Kosten']];

    const dienstleistungenArray = dienstleistungen.split('\n');
    const beschreibungenArray = beschreibungen.split('\n');
    const kostenArray = kosten.split('\n');

    const table2Data = dienstleistungenArray.map((dienstleistung, index) => [
        dienstleistung.trim(),
        beschreibungenArray[index] ? beschreibungenArray[index].trim() : 'Keine Beschreibung vorhanden',
        kostenArray[index] ? kostenArray[index].trim() : 'Keine Kosten angegeben',
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        headStyles: { fillColor: [240, 128, 128] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        head: table2Headers,
        body: table2Data,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: table2Widths[0] },
            1: { cellWidth: table2Widths[1] },
            2: { cellWidth: table2Widths[2] },
        },
    });

    const table3Widths = [50, 50];
    const table3Headers = [['Bezahlungsart', 'Preis']];
    const table3Data = [
        [bezahlungsart, preis]
    ];

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        headStyles: { fillColor: [0, 128, 128] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        head: table3Headers,
        body: table3Data,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: table3Widths[0] },
            1: { cellWidth: table3Widths[1] }
        },
    });

    const table4Headers = [['Anmerkungen']];
    const table4Data = [[anmerkungen]];

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        headStyles: { fillColor: [200, 200, 200] },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        head: table4Headers,
        body: table4Data,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.5
        },
        columnStyles: {
            0: { cellWidth: 250 }
        },
    });

    const fileName = `Rechnung_${formattedDate}.pdf`;
    doc.save(fileName);
    return doc.output('blob');
}


function printWithLayout() {
    const rechnungsnummer = document.querySelector("input[placeholder='Rechnungsnummer']").value;
    const ticketnummer = document.querySelector("input[placeholder='Ticketnummer']").value;
    const kunde = document.querySelector("input[placeholder='Kunde']").value;
    const tickettitel = document.querySelector("input[placeholder='Tickettitel']").value;
    const ticketbeschreibung = document.querySelector("input[placeholder='Ticket Beschreibung']").value;
    const dienstleistungen = document.querySelector("textarea[placeholder='Dienstleistungs Nr.']").value;
    const beschreibungen = document.querySelector("textarea[placeholder='Beschreibung der Dienstleistung']").value;
    const kosten = document.querySelector("textarea[placeholder='Kosten der jeweiligen Dienstleistung']").value;
    const bezahlungsart = document.querySelector("input[placeholder='Bezahlungsart']").value;
    const preis = document.querySelector("input[placeholder='Preis']").value;

    const anmerkungen = document.getElementById("notes").value || "Keine Anmerkungen angegeben.";

    const printURL = `print.html?rechnungsnummer=${encodeURIComponent(rechnungsnummer)}&ticketnummer=${encodeURIComponent(ticketnummer)}&kunde=${encodeURIComponent(kunde)}&tickettitel=${encodeURIComponent(tickettitel)}&ticketbeschreibung=${encodeURIComponent(ticketbeschreibung)}&dienstleistungen=${encodeURIComponent(dienstleistungen)}&beschreibungen=${encodeURIComponent(beschreibungen)}&kosten=${encodeURIComponent(kosten)}&bezahlungsart=${encodeURIComponent(bezahlungsart)}&preis=${encodeURIComponent(preis)}&anmerkungen=${encodeURIComponent(anmerkungen)}`;

    const printWindow = window.open(printURL, "_blank");

    printWindow.addEventListener('load', function () {
        printWindow.print();
        printWindow.onafterprint = function () {
            printWindow.close();
        };
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('.btn[value="Save as PDF"]');
    saveButton.addEventListener('click', saveAsPDF);

    const emailButton = document.querySelector('.btn[value="Send to E-Mail"]');
    emailButton.addEventListener('click', sendEmail);
});

async function SetParametersOfRechnung(PK) {
    let PK_Rechnung = -1;

    const checkForExsistingRechnung = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungbytkey", "key": PK });


    if (checkForExsistingRechnung.length != 0) {
        await PrepareRechnung(checkForExsistingRechnung.Rechnungsnr);
        return;
    }
    const ticketData = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketbykey", "key": PK });


    const Ticketbeschreibung = ticketData["Beschreibung"];
    const Abrechnung = "Rechnung für Ticket " + PK;
    const Ratenzahlung = parseInt(0);
    const FK_Bezahlungsart = 2;
    const FK_Kunde = ticketData["Kunde_Values"]["PK_Kunde"];
    const FK_Ticket = PK;

    const rechnungData = await postAsync("/helpdesk/Page/routes/api/api.php", {
        "method": "setrechnungmain",
        "Ticketbeschreibung": Ticketbeschreibung,
        "Abrechnung": Abrechnung,
        "Ratenzahlung": Ratenzahlung,
        "FK_Bezahlungsart": FK_Bezahlungsart,
        "FK_Kunde": FK_Kunde,
        "FK_Ticket": FK_Ticket
    });

    PK_Rechnung = rechnungData;

    if (PK_Rechnung === -1) {
        console.error("PK HASN'T CHANGED");
        return;
    }

    await PrepareRechnung(PK_Rechnung);

}

async function PrepareRechnung(PKRNR) {


    const data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungbykey", "key": PKRNR });


    const Ticketnummer = data["Ticket_Values"]["PK_Ticket"];
    const Rechnungsnummer = data["Rechnungsnr"];
    const Mitarbeiter_Vorname = data["Ticket_Values"]["Mitarbeiter_Values"]["Vorname"];
    const Mitarbeiter_Nachname = data["Ticket_Values"]["Mitarbeiter_Values"]["Nachname"];
    const Mitarbeiter = `${Mitarbeiter_Vorname} ${Mitarbeiter_Nachname}`;
    const Kunde = data["Kunde_Values"]["Firmenname"];
    const Beschreibung = data["Ticketbeschreibung"];
    const Titel = data["Ticket_Values"]["Ticket_Titel"];
    const Bezahlungsart = data["Bezahlungsart_Values"]["Artname"];

    const Dienstleistungen = [];
    const Dienstleistungen_Beschreibung = [];
    const Kosten = [];
    let gesamtKosten = 0;

    if (data["Ticket_Values"]["Dienstleistung_Values"] != undefined) {
        data["Ticket_Values"]["Dienstleistung_Values"].forEach(dienstleistung => {

            if (dienstleistung[0] != undefined) {
                dienstleistung = dienstleistung[0];
            }

            Dienstleistungen.push(dienstleistung["PK_Dienstleistung"]);
            Dienstleistungen_Beschreibung.push(dienstleistung["Beschreibung"]);

            const kostenWert = parseFloat(dienstleistung["Kosten"]);
            Kosten.push(`${kostenWert} €`);

            gesamtKosten += kostenWert;
        });
    }

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
    document.querySelector('.Grid-Item.item-7 input[placeholder="Bezahlungsart"]').value = Bezahlungsart;
}

//Broken
async function sendEmail() {
    const data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungbykey", "key": PKRNR });



    const fileName = `Rechnung_${new Date().toLocaleDateString('de-DE').replace(/\./g, '-')}.pdf`;
    const formData = new FormData();
    formData.append('pdf', pdfBlob, fileName);
    formData.append('email', data[0]["Kunden_Values"][0]["Email"]);
    formData.append('subject', `Rechnung: ${fileName}`);



    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Fehler beim Senden der E-Mail:', error);
            alert('Fehler beim Senden der E-Mail.');
        });
}