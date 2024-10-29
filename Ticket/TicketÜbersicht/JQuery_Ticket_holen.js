
function GetTicket(){

    $.post( "../../API/api.php", {"method":"getticketbykey", "key":"1"}, function( data ) {
        console.log(data)

        const output = document.getElementById('output');
        const PK_Ticket = data[0]["PK_Ticket"];
        const Titel = data[0]["Ticket_Titel"];
        const Kunde = data[0][Kunde[]];
        const Status = data[0]["Status"];
        const Prio = data[0][""];
        const Art = data[0][""];
        const Bearbeiter = data[0][""];
        const Ersteller = data[0][""];
        const Erstelldatum = data[0]["Erstelldatum"];

        console.log(Titel);
        console.log(Status);

      });


}