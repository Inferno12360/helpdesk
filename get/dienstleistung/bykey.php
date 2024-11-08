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

$stmt = $conn->prepare("SELECT * FROM `dienstleistung` WHERE `dienstleistung`.`PK_Dienstleistung` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$dienstleistung = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $dienstleistung[] = [
    'PK_Dienstleistung' => $row['PK_Dienstleistung'],
    'Beschreibung' => $row['Beschreibung'],
    'Kosten' => $row['Kosten'],
  ];
}
return json_encode($dienstleistung);