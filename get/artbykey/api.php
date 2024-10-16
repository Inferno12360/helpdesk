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

$stmt = $conn->prepare("SELECT * FROM `art` WHERE `art`.`PK_Art` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$art = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $art[] = [
    'PK_Art' => $row['PK_Art'],
    'Artname' => $row['Artname'],
    'Beschreibung' => $row['Beschreibung'],
  ];
}
return json_encode($art);