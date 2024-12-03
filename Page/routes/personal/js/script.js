function load() {
  const data = loadData();
}

async function loadData() {
  const container = document.getElementById("PersonalContainer");


  const response = await $.post("/helpdesk/API/api.php", {"method": "getmitarbeiterall"});
  response.forEach(element => {
    console.log("Elemet", element);
    const div = document.createElement("div");

    const p1 = document.createElement("p");
    p1.textContent= element.Vorname;
    const p2 = document.createElement("p");
    p2.textContent=element.Nachname;
    const p3 = document.createElement("p");
    p3.textContent=element.Position;
    const p4 = document.createElement("p");
    p4.textContent=element.Ort_Values[0].PK_Ort;
    
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    container.appendChild(div);
  });
}