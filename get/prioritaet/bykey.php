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

$stmt = $conn->prepare("SELECT * FROM `priorität` WHERE `priorität`.`PK_Priorität` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$prioritaet = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $prioritaet[] = [
    'PK_Priorität' => $row['PK_Priorität'],
    'Prioritätsname' => $row['Prioritätsname'],
    'Beschreibung' => $row['Beschreibung'],
  ];
}
return json_encode($prioritaet);