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

$stmt = $conn->prepare("SELECT * FROM `arbeitet` WHERE `arbeitet`.`FK_Mitarbeiter` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$bezahlungsart = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $bezahlungsart[] = [
    'Mitarbeiter' => $row['FK_Mitarbeiter'],
    'Kunde' => $row['FK_Kunde']
  ];
}
return json_encode($bezahlungsart);