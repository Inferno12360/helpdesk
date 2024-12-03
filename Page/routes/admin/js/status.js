function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Priorität[]}*/
    const statusResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getstatusall" });
    const statusDataContainer = document.getElementById("StatusContainer");
    statusResponse.forEach(status => {
      const statusItem = document.createElement("div");
      statusItem.classList.add("data_item");

      const statusnameField = document.createElement("p");
      statusnameField.textContent = status.Statusname;
      const farbeField = document.createElement("p");
      farbeField.textContent = status.Farbe;
      const beschreibungField = document.createElement("p");
      beschreibungField.textContent = status.Beschreibung;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_delete");

      deleteButton.addEventListener("click", () => {
        deleteStatus(status.PK_Status);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList("data_button");
      editButton.addEventListener("click", () => {
        editStatus(status.PK_Status);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);;

      statusItem.appendChild(statusnameField);
      statusItem.appendChild(farbeField);
      statusItem.appendChild(beschreibungField);
      statusItem.appendChild(actionGroup);
      statusDataContainer.appendChild(statusItem);
    });
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editStatus(key) {
  const statusname = document.getElementById("Statusname");
  const farbe = document.getElementById("Farbe");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = statusname.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Status}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getstatusbykey",
        key: key,
      }
    )

    statusname.value = editResponse.Statusname;
    farbe.value = editResponse.Farbe;
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Status aktualisieren"
    submitButton.onclick = () => {
      updateStatus(editResponse.PK_Status);
    }
    showPopup("Successfully loaded Status", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateStatus(key) {
  const kosten = document.getElementById("Kosten");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = kosten.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updatestatusmain",
        Kosten: kosten.value,
        Beschreibung: beschreibung.value,
        PK_Dienstleistung: key,
      }
    )

    submitButton.textContent = "Neue Status hinzufügen"
    submitButton.onclick = () => {
      submitBezahlungsart();
    }
    statusname.value = "";
    farbe.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Status", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteStatus(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deletestatusmain",
        key: key
      }
    )
    showPopup("Successfully removed Status", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitStatus() {
  const statusname = document.getElementById("Statusname").value;
  const farbe = document.getElementById("Farbe").value;
  const beschreibung = document.getElementById("Beschreibung").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setstatusmain",
        Statusname: statusname,
        Farbe: farbe,
        Beschreibung: beschreibung
      }
    )

    showPopup("Successfully added new Status", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef Priorität
 * @property {number} PK_Priorität
 * @property {string} Statusname
 * @property {string} Farbe
 * @property {string} Beschreibung
 */