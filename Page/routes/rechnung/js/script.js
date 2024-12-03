function postAsync(url, data) {
  return new Promise((resolve, reject) => {
    $.post(url, data, function (response) {
      resolve(response["data"]);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function load() {
  const data = loadData();
}

async function loadData() {
  const container = document.getElementById("ListeContainer");


  const response = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getrechnungall" });
  response.forEach(element => {
    const div = document.createElement("div");
    div.classList.add('rechnung-item');

    const p1 = document.createElement("p");
    p1.textContent = element.Abrechnung;
    const p2 = document.createElement("p");
    p2.textContent = element.Bezahlungsart_Values.Beschreibung;
    const p3 = document.createElement("p");
    p3.textContent = element.Kunde_Values.Kundennummer;
    const p4 = document.createElement("p");
    p4.textContent = element.Ticketbeschreibung;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add('button-container');

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Löschen";
    const buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Bearbeiten";

    buttonEdit.addEventListener("click", () => {
      EditRechnung(element.Rechnungsnr);
    });

    buttonDelete.addEventListener("click", () => {
      DeleteRechnung(element.Rechnungsnr);
    });

    buttonContainer.appendChild(buttonEdit);
    buttonContainer.appendChild(buttonDelete);

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(buttonContainer);
    container.appendChild(div);
  });
}

async function DeleteRechnung(elementId) {

  const confirmDelete = confirm("Möchten Sie diese Rechnung wirklich löschen?");

  if (confirmDelete) {
    try {
      const response = await $.post("/helpdesk/Page/routes/api/delete/rechnung/main.php", {
        method: "deleterechnung",
        key: elementId
      });
      const jsonResponse = typeof response === "string" ? JSON.parse(response) : response;




      const div = document.querySelector(`.rechnung-item[data-id='${elementId}']`);
      if (div) {
        div.remove();
      }

      alert(jsonResponse.msg);

      location.reload();
    } catch (error) {
      location.reload();
    }
  } else {
  }
}

function EditRechnung(elementId) {
  window.open("/helpdesk/Page/routes/rechnung/routes/update_rechnung.html?pk=" + encodeURIComponent(elementId));
}