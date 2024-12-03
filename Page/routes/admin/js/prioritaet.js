function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Priorität[]}*/
    const prioritaetResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getprioritaetall" });
    const prioritaetDataContainer = document.getElementById("PrioritaetContainer");
    prioritaetResponse.forEach(prioritaet => {
      const prioritaetItem = document.createElement("div");
      prioritaetItem.classList.add("data_item");

      const prioritaetsnameField = document.createElement("p");
      prioritaetsnameField.textContent = prioritaet.Prioritätsname;
      const beschreibungField = document.createElement("p");
      beschreibungField.textContent = prioritaet.Beschreibung;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_delete");

      deleteButton.addEventListener("click", () => {
        deletePrioritaet(prioritaet.PK_Priorität);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList("data_button");
      editButton.addEventListener("click", () => {
        editPrioritaet(prioritaet.PK_Priorität);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      prioritaetItem.appendChild(prioritaetsnameField);
      prioritaetItem.appendChild(beschreibungField);
      prioritaetItem.appendChild(actionGroup);
      prioritaetDataContainer.appendChild(prioritaetItem);
    });
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editPrioritaet(key) {
  const prioritaetsname = document.getElementById("Priotitaetsname");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = prioritaetsname.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Priorität}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getprioritaetbykey",
        key: key,
      }
    )

    prioritaetsname.value = editResponse.Prioritätsname;
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Prioritaet aktualisieren"
    submitButton.onclick = () => {
      updatePrioritaet(editResponse.PK_Priorität);
    }
    showPopup("Successfully loaded Prioritaet", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updatePrioritaet(key) {
  const prioritaetsname = document.getElementById("Priotitaetsname");
  const beschreibung = document.getElementById("Beschreibung").value;
  const submitButton = prioritaetsname.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updateprioritaetmain",
        Prioritätsname: prioritaetsname.value,
        Beschreibung: beschreibung,
        PK_Priorität: key,
      }
    )

    submitButton.textContent = "Neue Prioritaet hinzufügen"
    submitButton.onclick = () => {
      submitPrioritaet();
    }
    kosten.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Prioritaet", "success");
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

async function deletePrioritaet(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deleteprioritaetmain",
        key: key
      }
    )
    showPopup("Successfully removed Ort", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error, "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitPrioritaet() {
  const prioritaetsname = document.getElementById("Priotitaetsname").value;
  const beschreibung = document.getElementById("Beschreibung").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setprioritaetmain",
        Prioritaetsname: prioritaetsname,
        Beschreibung: beschreibung
      }
    )

    showPopup("Successfully added new Ort", "success");
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
 * @property {string} Prioritätsname
 * @property {string} Beschreibung
 */