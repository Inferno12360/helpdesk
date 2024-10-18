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

$stmt = $conn->prepare("SELECT * FROM `ort` WHERE `ort`.`PK_Ort` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$ort = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $ort[] = [
    'PK_Ort' => $row['PK_Ort'],
    'Stadt' => $row['Stadt'],
    'PLZ' => $row['PLZ'],
    'Straße' => $row['Straße'],
    'Hausnummer' => $row['Hausnummer'],
  ];
}
return json_encode($ort);