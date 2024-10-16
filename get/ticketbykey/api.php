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
  $mainStmt = $conn->prepare("SELECT * FROM `ticket` WHERE `ticket`.`PK_Ticket` = :pkey");
  $mainStmt->bindParam(":pkey", $primaryKey);
  $mainStmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}

$tickets = [];

while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow['FK_Status'];
  $status = json_decode(include __DIR__ . '/../statusbykey/api.php', true);

  $_REQUEST['key'] = $mainRow['FK_Priorität'];
  $prioritaet = json_decode(include __DIR__ . '/../prioritaetbykey/api.php', true);

  $_REQUEST['key'] = $mainRow['FK_Art'];
  $art = json_decode(include __DIR__ . '/../artbykey/api.php', true);

  $_REQUEST['key'] = $mainRow['FK_Mitarbeiter'];
  $mitarbeiter = json_decode(include __DIR__ . '/../mitarbeiterbykey/api.php', true);

  $_REQUEST['key'] = $mainRow['FK_Kunde'];
  $kunde = json_decode(include __DIR__ . '/../kundebykey/api.php', true);

  $tickets[] = [
    'PK_Ticket' => $mainRow['PK_Ticket'],
    'Ticket_Titel' => $mainRow['Ticket_Titel'],
    'Beschreibung' => $mainRow['Beschreibung'],
    'Interne_Notiz' => $mainRow['Interne_Notiz'],
    'Interner_Status' => $mainRow['Interner_Status'],
    'Erstelldatum' => $mainRow['Erstelldatum'],
    'Bearbeitungsdatum' => $mainRow['Bearbeitungsdatum'],
    'Status_Values' => $status,
    'Priorität_Values' => $prioritaet,
    'Art_Values' => $art,
    'Mitarbeiter_Values' => $mitarbeiter,
    'Kunde_Values' => $kunde,
  ];
}

return json_encode($tickets);
