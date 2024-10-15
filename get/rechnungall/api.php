<?php
include("../../conn.php");

$stmt = $conn->prepare("SELECT * FROM rechnung");
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
return json_encode($rechnung);