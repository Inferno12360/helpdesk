function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Ort[]}*/
    const ortResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getortall" });
    const ortDataContainer = document.getElementById("OrtContainer");
    ortResponse.forEach(ort => {
      const ortItem = document.createElement("div");
      ortItem.classList.add("data_item");

      const stadtField = document.createElement("p");
      stadtField.textContent = ort.Stadt;
      const plzField = document.createElement("p");
      plzField.textContent = ort.PLZ;
      const streetField = document.createElement("p");
      streetField.textContent = ort.Straße;
      const hausnummerField = document.createElement("p");
      hausnummerField.textContent = ort.Hausnummer;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_delete");

      deleteButton.addEventListener("click", () => {
        deleteOrt(ort.PK_Ort);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList("data_button");
      editButton.addEventListener("click", () => {
        editOrt(ort.PK_Ort);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      ortItem.appendChild(stadtField);
      ortItem.appendChild(plzField);
      ortItem.appendChild(streetField);
      ortItem.appendChild(hausnummerField);
      ortItem.appendChild(actionGroup);
      ortDataContainer.appendChild(ortItem);
    });
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editOrt(key) {
  const stadt = document.getElementById("Stadt");
  const plz = document.getElementById("PLZ");
  const street = document.getElementById("Street");
  const hausnummer = document.getElementById("Hausnummer");
  const submitButton = stadt.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Ort}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getortbykey",
        key: key,
      }
    )

    stadt.value = editResponse.Stadt;
    plz.value = editResponse.PLZ;
    street.value = editResponse.Straße;
    hausnummer.value = editResponse.Hausnummer;
    submitButton.textContent = "Ort aktualisieren"
    submitButton.onclick = () => {
      updateOrt(editResponse.PK_Ort);
    }
    showPopup("Successfully loaded Ort", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateOrt(key) {
  const stadt = document.getElementById("Stadt");
  const plz = document.getElementById("PLZ").value;
  const street = document.getElementById("Street").value;
  const hausnummer = document.getElementById("Hausnummer").value;
  const submitButton = stadt.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updateortmain",
        Stadt: stadt.value,
        PLZ: plz,
        Straße: street,
        Hausnummer: hausnummer,
        PK_Dienstleistung: key,
      }
    )

    submitButton.textContent = "Neue Ort hinzufügen"
    submitButton.onclick = () => {
      submitOrt();
    }
    stadt.value = "";
    plz.value = "";
    street.value = "";
    hausnummer.value = "";

    showPopup("Successfully updated Ort", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteOrt(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deleteortmain",
        key: key
      }
    )
    showPopup("Successfully deleted Ort", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitOrt() {
  const stadt = document.getElementById("Stadt").value;
  const plz = document.getElementById("PLZ").value;
  const street = document.getElementById("Street").value;
  const hausnummer = document.getElementById("Hausnummer").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setortmain",
        Stadt: stadt,
        PLZ: plz,
        Strasse: street,
        Hausnummer: hausnummer
      }
    )

    showPopup("Successfully added new Ort", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}