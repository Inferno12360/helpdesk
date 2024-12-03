function postAsync(url, data) {
  return new Promise((resolve, reject) => {
    $.post(url, data, function (response) {
      resolve(response["data"]);
    }).fail(function (error) {
      reject(error);
    });
  });
}

async function GetTicket() {

  let Navi = loadTemplate("/helpdesk/Page/template/navbar_logged_in.html", "Navigation")


  let output = document.getElementById('Output-Tickets');

  let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getticketall" })

  output.innerHTML = "";
  for (let i = 0; i <= data.length - 1; i++) {

    let PK_Ticket;
    let Titel;
    let Kunde;
    let Status;
    let Prio;
    let Art;
    let Bearbeiter; //Geprüft werden
    let Vorname;
    let Nachname;
    let Ersteller;
    let Erstelldatum;


    PK_Ticket = data[i]["PK_Ticket"];
    Titel = data[i]["Ticket_Titel"];
    Kunde = data[i]["Kunde_Values"]["Firmenname"];
    Status = data[i]["Status_Values"]["Statusname"];
    Prio = data[i]["Priorität_Values"]["Prioritätsname"];
    Art = data[i]["Art_Values"]["Artname"];
    Bearbeiter = data[i][""]; //Geprüft werden
    Vorname = data[i]["Mitarbeiter_Values"]["Vorname"];
    Nachname = data[i]["Mitarbeiter_Values"]["Nachname"]
    Ersteller = Vorname + " " + Nachname
    Erstelldatum = data[i]["Erstelldatum"];
    Erstelldatum = new Date(Date.parse(Erstelldatum));
    Erstelldatum = Erstelldatum.toISOString().substring(0, 10);


    let ausgabe = "";
    ausgabe = '<div class="grid-EinTicket">'
    ausgabe += '<input type="text" id="TicketNr" class="TempL" value="' + PK_Ticket + '" readonly>';
    ausgabe += '<input type="text" id="TicketTitel" class="TempL" value="' + Titel + '" readonly>'
    ausgabe += '<input type="text" id="Kunde" class="TempL" value="' + Kunde + '" readonly>'
    //Status
    if (data[i]["Status_Values"]["Farbe"] == "Rot") {
      ausgabe += '<input type="text" id="Status" class="TempL" value="' + Status + '"style="background-color: #FF6666;" readonly>'
    }
    if (data[i]["Status_Values"]["Farbe"] == "Gelb") {
      ausgabe += '<input type="text" id="Status" class="TempL" value="' + Status + '"style="background-color: #FFFF99;" readonly>'
    }
    if (data[i]["Status_Values"]["Farbe"] == "Grün") {
      ausgabe += '<input type="text" id="Status" class="TempL" value="' + Status + '"style="background-color: #66CC66;" readonly>'
    }
    if (data[i]["Status_Values"]["Farbe"] == "Blau") {
      ausgabe += '<input type="text" id="Status" class="TempL" value="' + Status + '"style="background-color: #CCFFFF;" readonly>'
    }
    if (data[i]["Status_Values"]["Farbe"] == "Grau") {
      ausgabe += '<input type="text" id="Status" class="TempL" value="' + Status + '"style="background-color: #CCCCCC;" readonly>'
    }
    //Prio
    if (data[i]["Priorität_Values"]["Prioritätsname"] == "Sehr Hoch") {
      ausgabe += '<input type="text" id="Prio" class="TempL" value="' + Prio + '" style="background-color: #CC3333;" readonly>'
    }
    if (data[i]["Priorität_Values"]["Prioritätsname"] == "Hoch") {
      ausgabe += '<input type="text" id="Prio" class="TempL" value="' + Prio + '" style="background-color: #FF6666;" readonly>'
    }
    if (data[i]["Priorität_Values"]["Prioritätsname"] == "Mittel") {
      ausgabe += '<input type="text" id="Prio" class="TempL" value="' + Prio + '" style="background-color: #FFFF99;" readonly>'
    }
    if (data[i]["Priorität_Values"]["Prioritätsname"] == "Niedrig") {
      ausgabe += '<input type="text" id="Prio" class="TempL" value="' + Prio + '" style="background-color: #66CC66;" readonly>'
    }
    if (data[i]["Priorität_Values"]["Prioritätsname"] == "Gering") {
      ausgabe += '<input type="text" id="Prio" class="TempL" value="' + Prio + '" readonly>'
    }
    ausgabe += '<input type="text" id="Art" class="TempL" value="' + Art + '" readonly>'
    ausgabe += '<input type="text" id="Bearbeiter" class="TempL" value="Bearbeiter" readonly>'

    ausgabe += '<input type="text" id="Ersteller" class="TempL" value="' + Ersteller + '" readonly>'
    ausgabe += '<input type="date" id="Erstelldatum" class="TempL" value="' + Erstelldatum + '" readonly>'
    ausgabe += '<button type="submit" id="Bearbeiten" onclick="Tkt_Bearb(' + PK_Ticket + ')">'
    ausgabe += '<img src="./img/Bearbeiten.png" alt="BearbeitenBtn" id="BearbeitenBtn" /></button>'
    ausgabe += '<button type="submit" id="Rechnung" onclick="PK_Übergeben(' + PK_Ticket + ')">'
    ausgabe += '<img src="./img/Rechnung.png" alt="RechnungBtn" id="RechnungBtn" /></button>'
    ausgabe += '<button type="submit" id="Löschen" onclick="DeleteTicket(' + PK_Ticket + ')" > '
    ausgabe += '<img src="./img/X.png" alt="LöschenBtn" id="LöschenBtn" /></button>'
    ausgabe += '</div>'
    output.innerHTML += ausgabe;
  }
  let ticket = document.getElementById("navTicket");
  ticket.href = "/helpdesk/Page/routes/ticket/routes/ticket.html";
  ticket.textContent = "Ticket erstellen";
}

function PK_Übergeben(PK) {
  window.open("/helpdesk/Page/routes/rechnung/routes/rechnung.html?pk=" + encodeURIComponent(PK));
}
function Tkt_Bearb(PK) {
  window.open("./routes/ticket.html?pk=" + encodeURIComponent(PK));
}
async function DeleteTicket(PK_Ticket) {
  const userConfirmed = confirm("Möchten Sie dieses Ticket wirklich löschen?");
  if (userConfirmed) {
    try {
      const response = await fetch("/helpdesk/Page/routes/api/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "method": "deleteticketmain",
          "key": PK_Ticket
        })
      });
      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Tickets. Status: " + response.status);
      }
      console.log("Löschvorgang erfolgreich!");
      location.reload();

    } catch (error) {
      console.error("Fehler beim Löschen des Tickets:", error);
    }
  } else {
    console.log("Löschvorgang abgebrochen.");
  }
}



