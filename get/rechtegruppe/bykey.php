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

$stmt = $conn->prepare("SELECT * FROM `rechtegruppe` WHERE `rechtegruppe`.`PK_Rechtegruppe` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$rechtegruppe = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $rechtegruppe[] = [
    'PK_Rechtegruppe' => $row['PK_Rechtegruppe'],
    'Administrationsrechte' => $row['Administrationsrechte'],
    'Bestelllimit' => $row['Bestelllimit'],
    'Helpdesk_Fernwartung' => $row['Helpdesk_Fernwartung'],
  ];
}
return json_encode($rechtegruppe);