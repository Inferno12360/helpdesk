let kundenData;

function load() {
  let nav = loadTemplate("../template/header.html", "body");
  let data = loadData();
}

async function loadData() {
  document.getElementsByTagName('body')[0].classList.add("loading");
  try {
    /** @type {Ort[]}*/
    const ortResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getortall" });
    /** @type {HTMLSelectElement} */
    const ortSelect = document.getElementById("Ort");
    ortResponse.forEach(ort => {
      const option = document.createElement("option");
      option.id = ort.PK_Ort;
      option.textContent = `${ort.Stadt} (${ort.PLZ}) [${ort.Straße} ${ort.Hausnummer}]`;
      ortSelect.appendChild(option);
    });
    /** @type {Rechtegruppe[]}*/
    const rechtegruppeResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getrechtegruppeall" });
    /** @type {HTMLSelectElement} */
    const rechtegruppeSelect = document.getElementById("Rechtegruppe");
    rechtegruppeResponse.forEach(rechtegruppe => {
      const option = document.createElement("option");
      option.id = rechtegruppe.PK_Rechtegruppe;
      option.textContent = `${rechtegruppe.Bestelllimit}
Administrationsrechte: ${rechtegruppe.Administrationsrechte ? "Ja" : "Nein"}
Helpdesk: ${rechtegruppe.Helpdesk_Fernwartung ? "Ja" : "Nein"}`;
      rechtegruppeSelect.appendChild(option);
    });
    /** @type {Kunde[]}*/
    const kundenResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getkundeall" });
    kundenData = kundenResponse;
    /** @type {HTMLDivElement} */
    const kundenDiv = document.getElementById("KundenListe");
    kundenResponse.forEach(kunde => {
      const kundeItem = document.createElement("div");
      kundeItem.classList.add("kunde_item");

      const kundeId = document.createElement("p");
      kundeId.id = kunde.PK_Kunde;
      kundeId.textContent = kunde.PK_Kunde;
      kundeId.classList.add("kunde_id");

      const kundeName = document.createElement("p");
      kundeName.textContent = kunde.Firmenname;
      kundeName.classList.add("kunde_name");

      const kundeChosen = document.createElement("input");
      kundeChosen.type = "checkbox";
      kundeChosen.id = kunde.PK_Kunde;
      kundeChosen.onchange = () => blockCheck(kundenDiv);



      kundeItem.appendChild(kundeId);
      kundeItem.appendChild(kundeName);
      kundeItem.appendChild(kundeChosen);
      kundenDiv.appendChild(kundeItem);
    });
    /** @type {Mitarbeiter[]}*/
    const mitarbeiterResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getmitarbeiterall" })
    /** @type {HTMLDivElement} */
    const mitarbeiterDiv = document.getElementById("MitarbeiterContainer");
    mitarbeiterResponse.forEach(mitarbeiter => {
      const mitarbeiterItem = document.createElement("div");
      mitarbeiterItem.classList.add("data_item");

      const firmaField = document.createElement("p");
      if (mitarbeiter.Firma.length != 0) {
        firmaField.textContent = `${mitarbeiter.Firma.Kundennummer} ${mitarbeiter.Firma.Firmenname}`
      } else {
        firmaField.textContent = "ERROR in no Firma";
      }

      const vornameField = document.createElement("p");
      vornameField.textContent = mitarbeiter.Vorname;

      const nachnameField = document.createElement("p");
      nachnameField.textContent = mitarbeiter.Nachname;

      const positionField = document.createElement("p");
      positionField.textContent = mitarbeiter.Position;

      const phonenumberField = document.createElement("p");
      phonenumberField.textContent = mitarbeiter.Mobilnummer;

      const actionGroup = document.createElement("div");
      actionGroup.classList.add("data_actionGroup");
      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "../img/X.png"
      deleteImage.alt = "delete";
      deleteButton.appendChild(deleteImage);
      deleteButton.classList.add("data_button");

      deleteButton.addEventListener("click", () => {
        deleteMitarbeiter(mitarbeiter.PK_Mitarbeiter);
      });

      const editButton = document.createElement("button");
      const editImage = document.createElement("img");
      editImage.src = "../img/Bearbeiten.png";
      editImage.alt = "edit";
      editButton.appendChild(editImage);
      editButton.classList.add("data_button");
      editButton.addEventListener("click", () => {
        editMitarbeiter(mitarbeiter.PK_Mitarbeiter);
      })

      actionGroup.appendChild(editButton);
      actionGroup.appendChild(deleteButton);

      mitarbeiterItem.appendChild(firmaField);
      mitarbeiterItem.appendChild(vornameField);
      mitarbeiterItem.appendChild(nachnameField);
      mitarbeiterItem.appendChild(positionField);
      mitarbeiterItem.appendChild(phonenumberField);
      mitarbeiterItem.appendChild(actionGroup);
      mitarbeiterDiv.appendChild(mitarbeiterItem);
    })
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editMitarbeiter(key) {
  const vorname = document.getElementById("Vorname");
  const nachname = document.getElementById("Nachname");
  const position = document.getElementById("Position");
  const festnetznummer = document.getElementById("Festnetznummer");
  const mobilnummer = document.getElementById("Mobilnummer");
  const email = document.getElementById("EMail");
  const password = document.getElementById("Password");

  const ortSelect = document.getElementById("Ort");

  const rechtegruppeSelect = document.getElementById("Rechtegruppe");

  const kundenDiv = document.getElementById("KundenListe");
  const checkboxes = kundenDiv.querySelectorAll('input[type="checkbox"]');
  const submitButton = vorname.parentElement.parentElement.getElementsByTagName("button")[0];

  try {
    /** @type {Mitarbeiter}*/
    const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "getmitarbeiterbykey",
        key: key,
      }
    )

    vorname.value = editResponse.Vorname;
    nachname.value = editResponse.Nachname;
    position.value = editResponse.Position;
    festnetznummer.value = editResponse.Festnetznummer;
    mobilnummer.value = editResponse.Mobilnummer;
    email.value = editResponse.Email;
    password.value = editResponse.Passwort;

    ortSelect.selectedIndex = (function () {
      let options = ortSelect.getElementsByTagName('option');
      for (let i = 0; i < options.length; i++) {
        if (options[i].id == editResponse.Ort_Values.PK_Ort) {
          return i;
        }
      }
      return -1;
    })();

    rechtegruppeSelect.selectedIndex = (function () {
      let options = rechtegruppeSelect.getElementsByTagName('option');
      for (let i = 0; i < options.length; i++) {
        if (options[i].id == editResponse.Rechtegruppe_Values.PK_Rechtegruppe) {
          return i;
        }
      }
      return -1;
    })();

    const selectedCheckboxes1 = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked);
    if (selectedCheckboxes1.length > 0) {
      selectedCheckboxes1[0].checked = false;
      selectedCheckboxes1[0].dispatchEvent(new Event("change"));
    }

    const selectedCheckboxes = Array.from(checkboxes)
      .filter(checkbox => checkbox.id == editResponse.Firma.PK_Kunde);
    selectedCheckboxes[0].checked = true;
    selectedCheckboxes[0].dispatchEvent(new Event("change"));

    submitButton.textContent = "Mitarbeiter aktualisieren"
    submitButton.onclick = () => {
      updateMitarbeiter(editResponse.PK_Mitarbeiter);
    }
    showPopup("Successfully loaded Mitarbeiter", "success");
  } catch (error) {

    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
}

async function updateMitarbeiter(key) {
  const vorname = document.getElementById("Vorname");
  const nachname = document.getElementById("Nachname").value;
  const position = document.getElementById("Position").value;
  const festnetznummer = document.getElementById("Festnetznummer").value;
  const mobilnummer = document.getElementById("Mobilnummer").value;
  const email = document.getElementById("EMail").value;
  const password = document.getElementById("Password").value;

  const ortSelect = document.getElementById("Ort");
  const ortSelectedId = ortSelect.options[ortSelect.selectedIndex]?.id;

  const rechtegruppeSelect = document.getElementById("Rechtegruppe");
  const rechtegruppeSelectedId = rechtegruppeSelect.options[rechtegruppeSelect.selectedIndex]?.id;

  const kundenDiv = document.getElementById("KundenListe");
  const checkboxes = kundenDiv.querySelectorAll('input[type="checkbox"]');

  let selectedCheckboxes = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked);
  let selectedId = -1;
  if (selectedCheckboxes.length > 0) {
    selectedId = selectedCheckboxes[0].id;
  } else {
  }

  const submitButton = vorname.parentElement.parentElement.getElementsByTagName("button")[0];


  try {
    const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "updatemitarbeitermain",
        Vorname: vorname.value,
        Nachname: nachname,
        Position: position,
        Festnetznummer: festnetznummer,
        Mobilnummer: mobilnummer,
        Email: email,
        Passwort: password,
        FK_Ort: ortSelectedId,
        FK_Rechtegruppe: rechtegruppeSelectedId,
        FK_Kunde: selectedId,
        PK_Mitarbeiter: key,
      }
    )

    document.getElementById("Vorname").value = ""
    document.getElementById("Nachname").value = ""
    document.getElementById("Position").value = ""
    document.getElementById("Festnetznummer").value = ""
    document.getElementById("Mobilnummer").value = ""
    document.getElementById("EMail").value = ""
    document.getElementById("Password").value = ""
    ortSelect.selectedIndex = 0;
    rechtegruppeSelect.selectedIndex = 0;
    const selectedCheckboxes = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked);
    selectedCheckboxes.checked = false;
    selectedCheckboxes[0].dispatchEvent(new Event("change"));

    showPopup("Successfully updated Mitarbeiter", "success");
  } catch (error) {

    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }

  submitButton.textContent = "Mitarbeiter aktualisieren"
  submitButton.onclick = () => {
    updateMitarbeiter(editResponse.PK_Mitarbeiter);
  }

  document.getElementsByClassName("data_container")[0].replaceChildren();
  document.getElementsByClassName("kunden_list")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

async function deleteMitarbeiter(key) {
  try {
    const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "deletemitarbeitermain",
        key: key
      }
    )
    showPopup("Successfully deleted Mitarbeiter", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }




  document.getElementsByClassName("data_container")[0].replaceChildren();
  document.getElementsByClassName("kunden_list")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

function blockCheck(kundenDiv) {
  /** @type {NodeListOf<HTMLInputElement>} */
  const checkboxes = kundenDiv.querySelectorAll('input[type="checkbox"]');

  const selectedCheckboxes = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked);

  const anyChecked = selectedCheckboxes.length > 0;

  checkboxes.forEach(checkbox => {
    if (!checkbox.checked) {
      checkbox.disabled = anyChecked;
    }
  });
}
/**
 * @param {string} searchText
 */
function kundeSearch(searchText) {
  const filteredData = kundenData.filter((/** @type {Kunde}*/ customer) =>
    customer.Firmenname.toLowerCase().includes(searchText.toLowerCase()),
  );

  const kundenDiv = document.getElementById("KundenListe");
  kundenDiv.replaceChildren();

  filteredData.forEach(kunde => {
    const kundeItem = document.createElement("div");
    kundeItem.classList.add("kunde_item");

    const kundeId = document.createElement("p");
    kundeId.id = kunde.PK_Kunde;
    kundeId.textContent = kunde.PK_Kunde;
    kundeId.classList.add("kunde_id");

    const kundeName = document.createElement("p");
    kundeName.textContent = kunde.Firmenname;
    kundeName.classList.add("kunde_name");

    const kundeChosen = document.createElement("input");
    kundeChosen.type = "checkbox";
    kundeChosen.onchange = () => blockCheck(kundenDiv);

    kundeItem.appendChild(kundeId);
    kundeItem.appendChild(kundeName);
    kundeItem.appendChild(kundeChosen);
    kundenDiv.appendChild(kundeItem);
  });
}

async function submitMitarbeiter() {

  const vorname = document.getElementById("Vorname").value;
  const nachname = document.getElementById("Nachname").value;
  const position = document.getElementById("Position").value;
  const festnetznummer = document.getElementById("Festnetznummer").value;
  const mobilnummer = document.getElementById("Mobilnummer").value;
  const email = document.getElementById("EMail").value;
  const password = document.getElementById("Password").value;

  const ortSelect = document.getElementById("Ort");
  const ortSelectedId = ortSelect.options[ortSelect.selectedIndex]?.id;

  const rechtegruppeSelect = document.getElementById("Rechtegruppe");
  const rechtegruppeSelectedId = rechtegruppeSelect.options[rechtegruppeSelect.selectedIndex]?.id;

  const kundenDiv = document.getElementById("KundenListe");
  const checkboxes = kundenDiv.querySelectorAll('input[type="checkbox"]');

  const selectedCheckboxes = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked);


  try {
    const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
      {
        method: "setmitarbeitermain",
        vorname: vorname,
        nachname: nachname,
        position: position,
        festnetznummer: festnetznummer,
        mobilnummer: mobilnummer,
        email: email,
        passwort: password,
        fk_ort: ortSelectedId,
        fk_rechtegruppe: rechtegruppeSelectedId,
        fk_kunde: selectedCheckboxes[0].id,
      }
    )

    showPopup("Successfully created new Mitarbeiter", "success");
  } catch (error) {
    showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
  }
  document.getElementsByClassName("data_container")[0].replaceChildren();
  document.getElementsByClassName("kunden_list")[0].replaceChildren();
  setTimeout(() => {
    loadData();
  }, 1500);
}

/**
 * @typedef {object} Ort
 * @property {number} PK_Ort
 * @property {string} Stadt
 * @property {string} PLZ
 * @property {string} Straße
 * @property {string} Hausnummer
 */
/**
 * @typedef {Object} Rechtegruppe
 * @property {number} PK_Rechtegruppe - Primary Key of the Rechtegruppe Entry
 * @property {number} Administrationsrechte	- Number Boolean to show if said Rechtegruppe has this
 * @property {string} Bestelllimit - Number String that gives back how much an User is allowed to spent
 * @property {number} Helpdesk_Fernwartung - Number Boolean to show if said Rechtegruppe has this
 */
/**
 * @typedef {Object} Kunde
 * @property {number} PK_Kunde - Primary Key of the Kunde entry.
 * @property {string} Kundennummer - Unique identifier for the customer.
 * @property {string} Firmenname - The name of the company associated with the customer.
 * @property {string} Email - The email address of the customer.
 * @property {string} Passwort - The customer's password. (Should be securely hashed for security reasons.)
 */
/**
 * @typedef {Object} Mitarbeiter
 * @property {number} PK_Mitarbeiter - Primary key of the employee entry.
 * @property {string} Vorname - First name of the employee.
 * @property {string} Nachname - Last name of the employee.
 * @property {string} Position - Job title or position of the employee.
 * @property {string} Festnetznummer - Landline number of the employee.
 * @property {string} Mobilnummer - Mobile phone number of the employee.
 * @property {string} Email - Email address of the employee.
 * @property {string} Passwort - Employee's password (should be securely hashed).
 * @property {Ort[]} Ort_Values - Array of addresses associated with the employee.
 * @property {Rechtegruppe[]} Rechtegruppe_Values - Array of Rechtegruppe associated with the employee.
 * @property {Kunde[]} Firma - Array of customers (Kunde) linked to the employee's company.
 */