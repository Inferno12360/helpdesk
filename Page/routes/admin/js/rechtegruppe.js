function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Rechtegruppe[]}*/
    const rechtegruppeResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getrechtegruppeall" });
    const rechtegruppeDataContainer = document.getElementById("rechtegruppeContainer");
    rechtegruppeResponse.forEach(rechtegruppe => {
      const rechtegruppeItem = document.createElement("div");
      rechtegruppeItem.classList.add("data_item");

      const bestelllimitField = document.createElement("p");
      bestelllimitField.textContent = rechtegruppe.Bestelllimit;
      const adminField = document.createElement("input");
      adminField.type = "checkbox"
      adminField.checked = rechtegruppe.Administrationsrechte == 0 ? false : true;
      adminField.disabled = true;
      const helpdeskField = document.createElement("input");
      helpdeskField.type = "checkbox"
      helpdeskField.checked = rechtegruppe.Helpdesk_Fernwartung == 0 ? false : true;
      helpdeskField.disabled = true;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_delete");

      deleteButton.addEventListener("click", () => {
        deleteRechtegruppe(rechtegruppe.PK_Rechtegruppe);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList("data_button");
      editButton.addEventListener("click", () => {
        editRechtegruppe(rechtegruppe.PK_Rechtegruppe);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      rechtegruppeItem.appendChild(bestelllimitField);
      rechtegruppeItem.appendChild(adminField);
      rechtegruppeItem.appendChild(helpdeskField);
      rechtegruppeItem.appendChild(actionGroup);
      rechtegruppeDataContainer.appendChild(rechtegruppeItem);
    });
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editRechtegruppe(key) {
  const bestelllimit = document.getElementById("Bestelllimit");
  const admin = document.getElementById("Administrationsrechte");
  const helpdesk = document.getElementById("Helpdesk_Fernwartung");
  const submitButton = bestelllimit.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Rechtegruppe}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getrechtegruppebykey",
        key: key,
      }
    )

    kosten.value = editResponse.Kosten
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Rechtegruppe aktualisieren"
    submitButton.onclick = () => {
      updateRechtegruppe(editResponse.PK_Dienstleistung);
    }
    showPopup("Successfully loaded Rechtegruppe", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateRechtegruppe(key) {
  const bestelllimit = document.getElementById("Bestelllimit");
  const admin = document.getElementById("Administrationsrechte").checked ? 1 : 0;
  const helpdesk = document.getElementById("Helpdesk_Fernwartung").checked ? 1 : 0;
  const submitButton = bestelllimit.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updaterechtegruppemain",
        Administrationsrechte: admin,
        Bestelllimit: bestelllimit.value,
        Helpdesk_Fernwartung: helpdesk,
        PK_Rechtegruppe: key,
      }
    )

    submitButton.textContent = "Neue Rechtegruppe hinzufügen"
    submitButton.onclick = () => {
      submitRechtegruppe();
    }
    kosten.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Rechtegruppe", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteRechtegruppe(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deleterechtegruppemain",
        key: key
      }
    )
    showPopup("Successfully deleted Rechtegruppe", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitRechtegruppe() {
  const bestelllimit = document.getElementById("Bestelllimit").value;
  const admin = document.getElementById("Administrationsrechte").checked ? 1 : 0;
  const helpdesk = document.getElementById("Helpdesk_Fernwartung").checked ? 1 : 0;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setrechtegruppemain",
        Bestelllimit: bestelllimit,
        Administrationsrechte: admin,
        Helpdesk_Fernwartung: helpdesk
      }
    )

    showPopup("Successfully added new Rechtegruppe", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef {Object} Rechtegruppe
 * @property {number} PK_Rechtegruppe - Primary Key of the Rechtegruppe Entry
 * @property {number} Administrationsrechte	- Number Boolean to show if said Rechtegruppe has this
 * @property {string} Bestelllimit - Number String that gives back how much an User is allowed to spent
 * @property {number} Helpdesk_Fernwartung - Number Boolean to show if said Rechtegruppe has this
 */