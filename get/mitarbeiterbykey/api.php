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

$stmt = $conn->prepare("SELECT * FROM `mitarbeiter` WHERE `mitarbeiter`.`PK_Mitarbeiter` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$mitarbeiter = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $mitarbeiter[] = [
    'PK_Mitarbeiter' => $row['PK_Mitarbeiter'],
    'Vorname' => $row['Vorname'],
    'Nachname' => $row['Nachname']
  ];
}
return json_encode($mitarbeiter);