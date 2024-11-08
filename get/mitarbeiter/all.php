<?php
include_once __DIR__ . '/../../conn.php';
try {
  $mainStmt = $conn->prepare("SELECT * FROM mitarbeiter");
  $mainStmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
$mitarbeiter = [];
while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow['FK_Ort'];
  $Ort = json_decode(include __DIR__ . '/../ort/bykey.php', true);

  $_REQUEST['key'] = $mainRow['FK_Rechtegruppe'];
  $Rechtegruppe = json_decode(include __DIR__ . '/../rechtegruppe/bykey.php', true);

  $_REQUEST['key'] = $mainRow['PK_Mitarbeiter'];
  $arbeitet = json_decode(include __DIR__ . '/../arbeitet/bymkey.php', true);

  $_REQUEST['KEY'] = $arbeitet[0]['Kunde'];
  $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php', true);

  $mitarbeiter[] = [
    'PK_Mitarbeiter' => $mainRow['PK_Mitarbeiter'],
    'Vorname' => $mainRow['Vorname'],
    'Nachname' => $mainRow['Nachname'],
    'Position' => $mainRow['Position'],
    'Festnetznummer' => $mainRow['Festnetznummer'],
    'Mobilnummer' => $mainRow['Mobilnummer'],
    'Email' => $mainRow['Email'],
    'Passwort' => $mainRow['Passwort'],
    'Ort_Values' => $Ort,
    'Rechtegruppe_Values' => $Rechtegruppe,
    'Firma' => $kunde,
  ];
}
return json_encode($mitarbeiter);
