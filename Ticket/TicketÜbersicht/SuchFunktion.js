function revealDropdown(){
    const Drop = document.getElementById('dropdowncontent');
    Drop.style.display = "block";
}









function CheckboxKundeClick(){
    const output = document.getElementById('output');
    const checkbox = document.getElementById('FilterKunde');
    const AlleCheckboxen = document.getElementsByClassName('Filter');
    const AlleDropdowns = document.getElementById('Status');
    for (let index = 0; index < AlleCheckboxen.length; index++) {
        AlleCheckboxen[index].checked = false;
    }
    AlleDropdowns.selectedIndex = 0;
    checkbox.checked = true
    if(checkbox.checked){
    output.innerHTML =    '<input type="text" id="SucheKunde" class="SuchFelderEingabe" placeholder="Kunde">'
    }
}
function CheckboxTicketNrClick(){
    const output = document.getElementById('output');
    const checkbox = document.getElementById('FilterTicketNr');
    const AlleCheckboxen = document.getElementsByClassName('Filter');
    const AlleDropdowns = document.getElementById('Status');
    for (let index = 0; index < AlleCheckboxen.length; index++) {
        AlleCheckboxen[index].checked = false;
    }
    AlleDropdowns.selectedIndex = 0;
    checkbox.checked = true
    if(checkbox.checked){
    output.innerHTML =    '<input type="text" id="SucheTicketNr" class="SuchFelderEingabe" placeholder="TicketNr">'
    }
}
function CheckboxTitelClick(){
    const output = document.getElementById('output');
    const checkbox = document.getElementById('FilterTitel');
    const AlleCheckboxen = document.getElementsByClassName('Filter');
    const AlleDropdowns = document.getElementById('Status');
    for (let index = 0; index < AlleCheckboxen.length; index++) {
        AlleCheckboxen[index].checked = false;
    }
    AlleDropdowns.selectedIndex = 0;
    checkbox.checked = true
    if(checkbox.checked){
    output.innerHTML =    '<input type="text" id="SucheTitel" class="SuchFelderEingabe" placeholder="Titel">'
    }
}
function CheckboxAktBearbeiterClick(){
    const output = document.getElementById('output');
    const checkbox = document.getElementById('FilterAktuellerBearbeiter');
    const AlleCheckboxen = document.getElementsByClassName('Filter');
    const AlleDropdowns = document.getElementById('Status');
    for (let index = 0; index < AlleCheckboxen.length; index++) {
        AlleCheckboxen[index].checked = false;
    }
    AlleDropdowns.selectedIndex = 0;
    checkbox.checked = true
    if(checkbox.checked){
    output.innerHTML =    '<input type="text" id="SucheAktBearbeiter" class="SuchFelderEingabe" placeholder="Bearbeiter">'
    }
}
function CheckboxDatumClick(){
    const output = document.getElementById('output');
    const checkbox = document.getElementById('FilterDatum');
    const AlleCheckboxen = document.getElementsByClassName('Filter');
    const AlleDropdowns = document.getElementById('Status');
    for (let index = 0; index < AlleCheckboxen.length; index++) {
        AlleCheckboxen[index].checked = false;
    }
    AlleDropdowns.selectedIndex = 0;
    checkbox.checked = true
    if(checkbox.checked){
    output.innerHTML =    '<input type="date" id="SucheDatum" class="SuchFelderEingabe">'
    }
}
