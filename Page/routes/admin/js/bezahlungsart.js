function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {bezahlungsart[]}*/
    const bezahlungsartResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getbezahlungsartall" });
    const bezahlungsartDataContainer = document.getElementById("BezahlungsartContainer");
    bezahlungsartResponse.forEach(bezahlungsart => {
      const bezahlungsartItem = document.createElement("div");
      bezahlungsartItem.classList.add("data_item");

      const artnameField = document.createElement("p");
      artnameField.textContent = bezahlungsart.Artname;
      const beschreibungField = document.createElement("p");
      beschreibungField.textContent = bezahlungsart.Beschreibung;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_button");

      deleteButton.addEventListener("click", () => {
        deleteBezahlungsart(bezahlungsart.PK_Bezahlungsart);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList.add("data_button");
      editButton.addEventListener("click", () => {
        editBezahlungsart(bezahlungsart.PK_Bezahlungsart);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      bezahlungsartItem.appendChild(artnameField);
      bezahlungsartItem.appendChild(beschreibungField);
      bezahlungsartItem.appendChild(actionGroup);
      bezahlungsartDataContainer.appendChild(bezahlungsartItem);
    });
  } catch (error) {

    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editBezahlungsart(key) {
  const artname = document.getElementById("Artname");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = artname.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Bezahlungsart}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getbezahlungsartbykey",
        key: key,
      }
    )

    artname.value = editResponse.Artname
    beschreibung.value = editResponse.Beschreibung;
    submitButton.textContent = "Bezahlungsart aktualisieren"
    submitButton.onclick = () => {
      updateBezahlungsart(editResponse.PK_Bezahlungsart);
    }
    showPopup("Successfully loaded Bezahlungsart", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateBezahlungsart(key) {
  const artname = document.getElementById("Artname");
  const beschreibung = document.getElementById("Beschreibung");
  const submitButton = artname.parentElement.getElementsByTagName("button")[0];

  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updatebezahlungsartmain",
        Beschreibung: beschreibung.value,
        Artname: artname.value,
        PK_Bezahlungsart: key,
      }
    )

    submitButton.textContent = "Neue Bezahlungsart hinzufügen"
    submitButton.onclick = () => {
      submitBezahlungsart();
    }
    artname.value = "";
    beschreibung.value = "";

    showPopup("Successfully updated Bezahlungsart", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteBezahlungsart(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deletebezahlungsartmain",
        key: key
      }
    )
    showPopup("Successfully deleted Bezahlungsart", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function submitBezahlungsart() {
  const artname = document.getElementById("Artname").value;
  const beschreibung = document.getElementById("Beschreibung").value;

  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setbezahlungsartmain",
        artname: artname,
        beschreibung: beschreibung
      }
    )

    showPopup("Successfully added new Bezahlungsart", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef Bezahlungsart
 * @property {number} PK_Bezahlungsart
 * @property {string} Artname
 * @property {string} Beschreibung
 */