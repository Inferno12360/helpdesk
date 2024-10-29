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

$stmt = $conn->prepare("SELECT * FROM `bezahlungsart` WHERE `bezahlungsart`.`PK_Bezahlungsart` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$bezahlungsart = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $bezahlungsart[] = [
    'PK_Bezahlungsart' => $row['PK_Bezahlungsart'],
    'Beschreibung ' => $row['Beschreibung'],
    'Artname ' => $row['Artname'],
  ];
}
return json_encode($bezahlungsart);