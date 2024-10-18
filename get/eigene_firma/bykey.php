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

$stmt = $conn->prepare("SELECT * FROM `eigene_firma` WHERE `eigene_firma`.`PK_EigeneFirma` = :pkey");
$stmt->bindParam(":pkey", $primaryKey);
$stmt->execute();
$eigene_firma = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $eigene_firma[] = [
    'PK_EigeneFirma' => $row['PK_EigeneFirma'],
    'Firmenename' => $row['Firmenename'],
  ];
}
return json_encode($eigene_firma);