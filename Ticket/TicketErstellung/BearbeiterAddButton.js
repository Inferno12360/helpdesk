document.getElementById('add-bearbeiter').addEventListener('click', function () {
    const container = document.getElementById('bearbeiter-container');
    const newField = document.createElement('div');
    newField.classList.add('bearbeiter-feld');
    newField.innerHTML = '<div class="bearbeiter-feld">' +
        '<select name="Bearbeiter" id="Bearbeiter">'+
        '<option value="placeholder">- Bearbeiter wählen -</option>'+
        '</select>' +
        '<div class="grid-DateTime">'+
        '<input type="date" id="Bearbeitungsdatum" placeholder="Bearbeitungsdatum"><input type="time" id="Bearbeitungszeit" placeholder="Bearbeitungszeit">' +
        '</div>' +
        '</div>';
    const secondNode = container.children[1];
    if (secondNode == undefined) {
        container.appendChild(newField);
    } else {
        container.insertBefore(newField, secondNode);
    }
});
