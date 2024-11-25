function load() {
  const data = loadData();
}

async function loadData() {
  const container = document.getElementById("ListeContainer");


  const response = await $.post("/helpdesk/API/api.php", {"method": "getrechnungall"});
  console.log(response);
  response.forEach(element => {
    console.log("Element", element);
    const div = document.createElement("div");

    const p1 = document.createElement("p");
    p1.textContent= element.Abrechnung;
    const p2 = document.createElement("p");
    p2.textContent=element.Bezahlungsart_Values[0].Beschreibung;
    const p3 = document.createElement("p");
    p3.textContent=element.Kunde_Values[0].Kundennummer;
    const p4 = document.createElement("p");
    p4.textContent=element.Ticketbeschreibung;
    
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    container.appendChild(div);
  });
}