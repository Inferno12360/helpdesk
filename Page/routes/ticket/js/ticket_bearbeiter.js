function postAsync(url, data) {
    return new Promise((resolve, reject) => {
        $.post(url, data, function (response) {
            resolve(response["data"]);
        }).fail(function (error) {
            reject(error);
        });
    });
}

document.getElementById('add-bearbeiter').addEventListener('click', async function () {
    const container = document.getElementById('bearbeiter-container');
    const newField = document.createElement('div');
    newField.classList.add('bearbeiter-feld');
    newField.innerHTML = '<div class="bearbeiter-feld">' +
        '<select name="Bearbeiter" id="Bearbeiter">' +

        '</select>' +
        '<div class="grid-DateTime">' +
        '<input type="date" id="Bearbeitungsdatum" placeholder="Bearbeitungsdatum"><input type="time" id="Bearbeitungszeit" placeholder="Bearbeitungszeit">' +
        '</div>' +
        '</div>';
    const secondNode = container.children[1];
    if (secondNode == undefined) {
        container.appendChild(newField);
    } else {
        container.insertBefore(newField, secondNode);
    }
    let data = await postAsync("/helpdesk/Page/routes/api/api.php", { "method": "getmitarbeiterall" })

    let output = document.getElementById('Bearbeiter');
    let BearbeiterDropInfos = "";

    BearbeiterDropInfos = '<option value="placeholder">- Bearbeiter wählen -</option>'
    for (let i = 0; i <= data.length - 1; i++) {
        BearbeiterDropInfos += '<option value="' + data[i]["PK_Mitarbeiter"] + '">' + data[i]["Vorname"] + " " + data[i]["Nachname"] + '</option>'
    }
    output.innerHTML += BearbeiterDropInfos;
});
