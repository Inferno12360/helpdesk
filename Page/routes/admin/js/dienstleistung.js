function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Dienstleistung[]}*/
    const dienstleistungResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getdienstleistungall" });
    const dienstleistungDataContainer = document.getElementById("DienstleistungContainer");
    dienstleistungResponse.forEach(dienstleistung => {
      const dienstleistungItem = document.createElement("div");
      dienstleistungItem.classList.add("data_item");

      const kostenField = document.createElement("p");
      kostenField.textContent = dienstleistung.Kosten;
      const beschreibungField = document.createElement("p");
      beschreibungField.textContent = dienstleistung.Beschreibung;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_button");

      deleteButton.addEventListener("click", () => {
        deleteDienstleistung(dienstleistung.PK_Dienstleistung);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList.add("data_button");
      editButton.addEventListener("click", () => {
        editDienstleistung(dienstleistung.PK_Dienstleistung);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      dienstleistungItem.appendChild(kostenField);
      dienstleistungItem.appendChild(beschreibungField);
      dienstleistungItem.appendChild(actionGroup);
      dienstleistungDataContainer.appendChild(dienstleistungItem);
    });
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editDienstleistung(key) {
  const kosten = document.getElementById("Kosten");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = kosten.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Dienstleistung}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getdienstleistungbykey",
        key: key,
      }
    )

    kosten.value = editResponse.Kosten
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Dienstleistung aktualisieren"
    submitButton.onclick = () => {
      updateDienstleistung(editResponse.PK_Dienstleistung);
    }
    showPopup("Successfully loaded Dienstleistung", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateDienstleistung(key) {
  const kosten = document.getElementById("Kosten");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = kosten.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updatedienstleistungmain",
        Kosten: kosten.value,
        Beschreibung: beschreibung.value,
        PK_Dienstleistung: key,
      }
    )

    submitButton.textContent = "Neue Dienstleistung hinzufügen"
    submitButton.onclick = () => {
      submitBezahlungsart();
    }
    kosten.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Dienstleistung", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteDienstleistung(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deletedienstleistungmain",
        key: key
      }
    )
    showPopup("Successfully deleted Dienstleistung", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitDienstleistung() {
  const kosten = document.getElementById("Kosten").value;
  const beschreibung = document.getElementById("Beschreibung").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setdienstleistungmain",
        kosten: kosten,
        beschreibung: beschreibung
      }
    )
    showPopup("Successfully added new Dienstleistung", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef Dienstleistung
 * @property {number} PK_Dienstleistung
 * @property {number} Kosten
 * @property {string} Beschreibung
 */