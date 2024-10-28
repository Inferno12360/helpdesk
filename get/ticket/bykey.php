<?php

include_once __DIR__ . '/../../conn.php';

if (!isset($_REQUEST['key'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field key is not set";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
} else {
  $primaryKey = $_REQUEST['key'];
}

try {
  $mainStmt2 = $conn->prepare("SELECT * FROM `ticket` WHERE `ticket`.`PK_Ticket` = :pkey");
  $mainStmt2->bindParam(":pkey", $primaryKey);
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
  $mitarbeiter = json_decode(include __DIR__ . '/../mitarbeiter/bykey.php', true);

  $_REQUEST['key'] = $mainRow2['FK_Kunde'];
  $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php', true);

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
    'Mitarbeiter_Values' => $mitarbeiter,
    'Kunde_Values' => $kunde,
  ];
}

return json_encode($tickets);