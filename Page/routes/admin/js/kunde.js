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

        /** @type {Kunde[]}*/
        const kundeResponse = await postAsync('/helpdesk/Page/routes/api/api.php', { method: "getkundeall" });
        const kundeDataContainer = document.getElementById("KundeContainer");
        kundeResponse.forEach(kunde => {
            const kundeItem = document.createElement("div");
            kundeItem.classList.add("data_item");

            const kundeNummerField = document.createElement("p");
            kundeNummerField.textContent = kunde.Kundennummer;
            const kundeFirmennameField = document.createElement("p");
            kundeFirmennameField.textContent = kunde.Firmenname;
            const kundeEMailField = document.createElement("p");
            kundeEMailField.textContent = kunde.Email;

            const actionGroup = document.createElement("div");
            actionGroup.classList.add("data_actionGroup");
            const deleteButton = document.createElement("button");
            const deleteImage = document.createElement("img");
            deleteImage.src = "../img/X.png"
            deleteImage.alt = "delete";
            deleteButton.appendChild(deleteImage);
            deleteButton.classList.add("data_button");

            deleteButton.addEventListener("click", () => {
                deleteKunde(kunde.PK_Kunde);
            });
            const editButton = document.createElement("button");
            const editImage = document.createElement("img");
            editImage.src = "../img/Bearbeiten.png";
            editImage.alt = "edit";
            editButton.appendChild(editImage);
            editButton.classList.add("data_button");
            editButton.addEventListener("click", () => {
                editKunde(kunde.PK_Kunde);
            })

            actionGroup.appendChild(editButton);
            actionGroup.appendChild(deleteButton);

            kundeItem.appendChild(kundeNummerField);
            kundeItem.appendChild(kundeFirmennameField);
            kundeItem.appendChild(kundeEMailField);
            kundeItem.appendChild(actionGroup);
            kundeDataContainer.appendChild(kundeItem);
        });
    } catch (error) {
        showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
    }
    document.getElementsByTagName('body')[0].classList.remove("loading");
}

async function editKunde(key) {
    const kundennummer = document.getElementById('Kundennummer');
    const firmenname = document.getElementById('Firmenname');
    const email = document.getElementById('EMail');
    const password = document.getElementById('Password');
    const ortSelect = document.getElementById("Ort");
    const submitButton = kundennummer.parentElement.parentElement.getElementsByTagName("button")[0];

    try {
        /** @type {Kunde}*/
        const editResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
            {
                method: "getkundebykey",
                key: key,
            }
        )

        const residiertResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
            {
                method: "getresidiertbykkey",
                key: key,
            }
        )

        Kundennummer.value = editResponse.Kundennummer;
        firmenname.value = editResponse.Firmenname;
        email.value = editResponse.Email;
        password.value = editResponse.Passwort;
        ortSelect.selectedIndex = (function () {
            let options = ortSelect.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                if (options[i].id == residiertResponse.Ort) {
                    return i;
                }
            }
            return -1;
        })();
        submitButton.textContent = "Kunde aktualisieren"
        submitButton.onclick = () => {
            updateKunde(editResponse.PK_Kunde);
        }
        showPopup("Successfully loaded Kunde", "success");
    } catch (error) {
        showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
    }
}

async function updateKunde(key) {
    const kundennummer = document.getElementById('Kundennummer');
    const firmenname = document.getElementById('Firmenname');
    const email = document.getElementById('EMail');
    const password = document.getElementById('Password');
    const ortSelect = document.getElementById("Ort");
    const ortSelectedId = ortSelect.options[ortSelect.selectedIndex]?.id;
    const submitButton = kundennummer.parentElement.parentElement.getElementsByTagName("button")[0];
    try {
        const updateResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
            {
                method: "updatekundemain",
                Kundennummer: kundennummer.value,
                Firmenname: firmenname.value,
                Email: email.value,
                Passwort: password.value,
                FK_Ort: ortSelectedId,
                PK_Kunde: key
            }
        )


        kundennummer.value = "";
        firmenname.value = "";
        email.value = "";
        password.value = "";
        ortSelect.selectedIndex = 0;
        submitButton.onclick = () => {
            submitKunde();
        }
        submitButton.textContent = "Neue Kunde hinzufügen"
        showPopup("Successfully updated Kunde", "success");
    } catch (error) {

        showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
    }

    document.getElementsByClassName("data_container")[0].replaceChildren();
    setTimeout(() => {
        loadData();
    }, 1500);
}

async function deleteKunde(key) {
    try {
        const deleteResponses = await postAsync('/helpdesk/Page/routes/api/api.php',
            {
                method: "deletekundemain",
                key: key
            }
        )
        showPopup("Successfully deleted Kunde", "success");
    } catch (error) {
        showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
    }

    document.getElementsByClassName("data_container")[0].replaceChildren();
    setTimeout(() => {
        loadData();
    }, 1500);
}

async function submitKunde() {
    const kundennummer = document.getElementById('Kundennummer').value;
    const firmenname = document.getElementById('Firmenname').value;
    const email = document.getElementById('EMail').value;
    const password = document.getElementById('Password').value;
    const ortSelect = document.getElementById("Ort");
    const ortSelectedId = ortSelect.options[ortSelect.selectedIndex]?.id;


    try {
        const setResponse = await postAsync('/helpdesk/Page/routes/api/api.php',
            {
                method: "setkundemain",
                Kundennummer: kundennummer,
                Firmenname: firmenname,
                Email: email,
                Passwort: password,
                FK_Ort: ortSelectedId
            }
        )
        showPopup("Successfully created new Kunde", "success");
    } catch (error) {
        showPopup("An Error occurred: " + error["responseJSON"]["msg"], "error");
    }

    document.getElementsByClassName("data_container")[0].replaceChildren();
    setTimeout(() => {
        loadData();
    }, 1500);
}

/**
 * @typedef {Object} Kunde
 * @property {number} PK_Kunde - The primary key of the customer.
 * @property {string} Kundennummer - The customer number.
 * @property {string} Firmenname - The company name.
 * @property {string} Email - The customer's email address.
 * @property {string} Passwort - The customer's password.
 */