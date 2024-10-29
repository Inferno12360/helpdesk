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

    const table1Widths = [40, 40, 45]; // Reduzierte Spaltenbreiten für Rechnungsnummer, Ticketnummer, Kunde
    const table1Headers = [['Rechnungsnummer', 'Ticketnummer', 'Kunde']];
    const table1Data = [
        ['-', '-', '-', '-'] // Dummy-Datenzeile mit leeren Werten
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
            2: { cellWidth: table1Widths[2] }
        },
    });

    const table2Widths = [40, 150, 25, 50]; // Reduzierte Spaltenbreiten für Dienstleistung, Beschreibung, Kosten
    const table2Headers = [['Dienstleistung', 'Beschreibung', 'Kosten', "Notizen"]];
    const table2Data = [
        ['-', '-', '-', '-'] // Dummy-Datenzeile mit leeren Werten
    ];

    doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30,
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
            3: { cellWidth: table2Widths[3] }
        },
    });
    
    const fileName = `Rechnung_${formattedDate}.pdf`;
    doc.save(fileName);
}

function printOverlay() {
    window.print();
}

function sendEmail() {
    const rechnungsnummer = document.querySelector('input[placeholder="Rechnungsnummer"]').value;
    const ticketnummer = document.querySelector('input[placeholder="Ticketnummer"]').value;
    const kunde = document.querySelector('input[placeholder="Kunde"]').value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "send_email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status == 200) {
            alert("E-Mail erfolgreich gesendet!");
        } else {
            alert("Fehler beim Senden der E-Mail.");
        }
    };
    xhr.send(`rechnungsnummer=${encodeURIComponent(rechnungsnummer)}&ticketnummer=${encodeURIComponent(ticketnummer)}&kunde=${encodeURIComponent(kunde)}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.btn[value="Save as PDF"]');
    saveButton.addEventListener('click', saveAsPDF);
    
    const printButton = document.querySelector('.btn[value="Print"]');
    printButton.addEventListener('click', printOverlay);
    
    const emailButton = document.querySelector('.btn[value="Send to E-Mail"]');
    emailButton.addEventListener('click', sendEmail);
});
PrepareRechnung();
function PrepareRechnung(){

    $.post("../../API/api.php", function(data){
        console.log(data)

 
    }).fail(function(jqXHR, textstatus, errorThrown){
        console.error("Fehler bei der Anfrage:", textstatus, errorThrown);
    });
}
/**       const Ticketnummer = ;
        const Rechnungsnummer = ;
        const Mitarbeiter = ;
        const Kunde = ;
        const Dienstleistung = ;
        const Beschreibung = ;
        const Kosten = ;
        const Preis = ;
        const Bezahlungsart = ; */