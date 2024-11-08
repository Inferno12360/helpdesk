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

$stmt4 = $conn->prepare("SELECT * FROM `abgeleitet` WHERE `abgeleitet`.`FK_Ticket` = :pkey");
$stmt4->bindParam(":pkey", $primaryKey);
$stmt4->execute();
$abgeleitet = [];
while ($mainRow4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
  $_REQUEST['key'] = $mainRow4['FK_Dienstleistung'];
  $mitarbeiter = json_decode(include __DIR__ . '/../dienstleistung/bykey.php', true);

  $abgeleitet[] = [
    $mitarbeiter
  ];
}
return json_encode($abgeleitet);