function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

let temp;

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Art[]}*/
    const artResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getartall" });
    const artDataContainer = document.getElementById("ArtContainer");
    artResponse.forEach(art => {
      const artItem = document.createElement("div");
      artItem.classList.add("data_item");

      const artnameField = document.createElement("p");
      artnameField.textContent = art.Artname;
      const beschreibungField = document.createElement("p");
      beschreibungField.textContent = art.Beschreibung;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_button");

      deleteButton.addEventListener("click", () => {
        deleteArt(art.PK_Art);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList.add("data_button");
      editButton.addEventListener("click", () => {
        editArt(art.PK_Art);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      artItem.appendChild(artnameField);
      artItem.appendChild(beschreibungField);
      artItem.appendChild(actionGroup);
      artDataContainer.appendChild(artItem);
    });
  } catch (error) {
    console.log(error);

    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editArt(key) {
  const artname = document.getElementById("Artname");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = artname.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Art}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getartbykey",
        key: key,
      }
    )

    artname.value = editResponse.Artname
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Art aktualisieren"
    submitButton.onclick = () => {
      updateArt(editResponse.PK_Art);
    }
    showPopup("Successfully loaded Art", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateArt(key) {
  const artname = document.getElementById("Artname");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = artname.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updateartmain",
        Beschreibung: beschreibung.value,
        Artname: artname.value,
        key: key,
      }
    )

    submitButton.textContent = "Neue Art hinzufügen"
    submitButton.onclick = () => {
      submitArt();
    }
    artname.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Art", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteArt(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deleteartmain",
        key: key
      }
    )
    showPopup("Successfully deleted Art", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitArt() {
  const artname = document.getElementById("Artname").value;
  const beschreibung = document.getElementById("Beschreibung").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setartmain",
        artname: artname,
        beschreibung: beschreibung
      }
    )

    showPopup("Successfully added new Art", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef Art
 * @property {number} PK_Art
 * @property {string} Artname
 * @property {string} Beschreibung
 */