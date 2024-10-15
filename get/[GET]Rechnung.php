<?php
function GET_Rechnung(){
    $handler = new PDO("mysql:host=localhost;dbname=helpdesk", "root", "");
	$stmt = $handler->prepare("SELECT * FROM rechnung");
	$stmt->execute();
    $rechnung = [];
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $rechnung[] = [
            'Rechnungsnr' => $row['Rechnungsnr'],
            'Ticketbeschreibung' => $row['Ticketbeschreibung'],
            'Abrechnung' => $row['Abrechnung'],
            'Ratenzahlung' => $row['Ratenzahlung']
        ];
    }
    echo json_encode($rechnung);
}
?>