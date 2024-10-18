<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

if (!isset($_REQUEST['key'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field key is not set";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
} else {
  $primaryKey = $_REQUEST['key'];
}

$mainStmt = $conn->prepare("SELECT * FROM `mitarbeiter` WHERE `mitarbeiter`.`PK_Mitarbeiter` = :pkey");
$mainStmt->bindParam(":pkey", $primaryKey);
$mainStmt->execute();
$mitarbeiter = [];
while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow['FK_Ort'];
  $Ort = json_decode(include __DIR__ . '/../ort/bykey.php', true);

  $_REQUEST['key'] = $mainRow['FK_Rechtegruppe'];
  $Rechtegruppe = json_decode(include __DIR__ . '/../rechtegruppe/bykey.php', true);

  $_REQUEST['key'] = $mainRow['FK_EigeneFirma'];
  $Eigenefirma = json_decode(include __DIR__ . '/../eigene_firma/bykey.php', true);

  $mitarbeiter[] = [
    'PK_Mitarbeiter' => $mainRow['PK_Mitarbeiter'],
    'Vorname' => $mainRow['Vorname'],
    'Nachname' => $mainRow['Nachname'],
    'Position' => $mainRow['Position'],
    'Festnetznummer' => $mainRow['Festnetznummer'],
    'Mobilnummer' => $mainRow['Mobilnummer'],
    'Email' => $mainRow['Email'],
    'Ort_Values' => $Ort,
    'Rechtegruppe_Values' => $Rechtegruppe,
    'EigeneFirma' => $Eigenefirma,
  ];
}
return json_encode($mitarbeiter);