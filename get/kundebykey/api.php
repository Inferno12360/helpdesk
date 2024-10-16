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

$stmt = $conn->prepare("SELECT * FROM `kunde` WHERE `kunde`.`PK_Kunde` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$kunde = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $kunde[] = [
    'PK_Kunde' => $row['PK_Kunde'],
    'Kundennummer' => $row['Kundennummer'],
    'Firmenname' => $row['Firmenname'],
  ];
}
return json_encode($kunde);