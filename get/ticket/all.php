<?php

include_once __DIR__ . '/../../conn.php';

try {
  $mainStmt2 = $conn->prepare("SELECT * FROM ticket");
  $mainStmt2->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}

$tickets = [];
while ($mainRow2 = $mainStmt2->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow2['FK_Status'];
  $status = json_decode(include __DIR__ . '/../status/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['FK_Priorität'];
  $prioritaet = json_decode(include __DIR__ . '/../prioritaet/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['FK_Art'];
  $art = json_decode(include __DIR__ . '/../art/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['FK_Mitarbeiter'];
  $mitarbeiter_values = json_decode(include __DIR__ . '/../mitarbeiter/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['FK_Kunde'];
  $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['PK_Ticket'];
  $bearbeiter = json_decode(include __DIR__ . '/../bearbeitet/bytkey.php', true);

  $_REQUEST['key'] = $mainRow2['PK_Ticket'];
  $dienstleistung = json_decode(include __DIR__ . '/../abgeleitet/bytkey.php', true);


  $tickets[] = [
    'PK_Ticket' => $mainRow2['PK_Ticket'],
    'Ticket_Titel' => $mainRow2['Ticket_Titel'],
    'Beschreibung' => $mainRow2['Beschreibung'],
    'Interne_Notiz' => $mainRow2['Interne_Notiz'],
    'Interner_Status' => $mainRow2['Interner_Status'],
    'Erstelldatum' => $mainRow2['Erstelldatum'],
    'Bearbeitungsdatum' => $mainRow2['Bearbeitungsdatum'],
    'Status_Values' => $status,
    'Priorität_Values' => $prioritaet,
    'Art_Values' => $art,
    'Mitarbeiter_Values' => $mitarbeiter_values,
    'Bearbeiter_Values' => $bearbeitet,
    'Dienstleistung_Values' => $dienstleistung,
    'Kunde_Values' => $kunde,
  ];
}

return json_encode($tickets);
