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

$stmt = $conn->prepare("SELECT * FROM `status` WHERE `status`.`PK_Status` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$status = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $status[] = [
    'PK_Status' => $row['PK_Status'],
    'Statusname' => $row['Statusname'],
    'Farbe' => $row['Farbe'],
    'Beschreibung' => $row['Beschreibung'],
  ];
}
return json_encode($status);

