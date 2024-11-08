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

$stmt3 = $conn->prepare("SELECT * FROM `bearbeitet` WHERE `bearbeitet`.`FK_Ticket` = :pkey");
$stmt3->bindParam(":pkey", $primaryKey);
$stmt3->execute();
$bearbeitet = [];
while ($mainRow3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow3['FK_Mitarbeiter'];
  $mitarbeiter = json_decode(include __DIR__ . '/../mitarbeiter/bykey.php', true);

  $bearbeitet[] = [
    $mitarbeiter,
  ];
}
return json_encode($bearbeitet);