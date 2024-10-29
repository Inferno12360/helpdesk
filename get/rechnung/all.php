<?php
include_once __DIR__ . '/../../conn.php';

$stmt3 = $conn->prepare("SELECT * FROM rechnung");
$stmt3->execute();
$rechnung = [];
while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {

  $_REQUEST['key'] = $row3['FK_Kunde'];
  $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php', true);

  $_REQUEST['key'] = $row3['FK_Ticket'];
  $ticket = json_decode(include __DIR__ . '/../ticket/bykey.php', true);

  $_REQUEST['key'] = $row3['FK_Bezahlungsart'];
  $bezahlungsart = json_decode(include __DIR__ . '/../bezahlungsart/bykey.php', true);

  $rechnung[] = [
    'Rechnungsnr' => $row3['Rechnungsnr'],
    'Ticketbeschreibung' => $row3['Ticketbeschreibung'],
    'Abrechnung' => $row3['Abrechnung'],
    'Ratenzahlung' => $row3['Ratenzahlung'],
    'Kunde_Values' => $kunde,
    'Ticket_Values' => $ticket,
    'Bezahlungsart_Values' => $bezahlungsart,
  ];
}
return json_encode($rechnung);