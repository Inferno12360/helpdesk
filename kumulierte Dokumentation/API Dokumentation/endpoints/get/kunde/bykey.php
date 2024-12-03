<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "key" => [
    "value" => null,
    "type" => "integer",
  ],
);

foreach ($params as $param => $arr) {
  if (!isset($_REQUEST[$param]) || empty($_REQUEST[$param])) {
    throwError('bad_param', "", "Field {$param} is not set");
  } else {
    try {
      $params[$param]["value"] = castValue($_REQUEST[$param], $arr['type']);
    } catch (Exception $e) {
      throwError("bad_casting_type", data: $e->getMessage());
    }
  }
}

try {
  $stmt = $conn->prepare("SELECT * FROM `kunde` WHERE `kunde`.`PK_Kunde` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $kundeData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedKundeData = [];
  foreach ($kundeData as $row2) {
    $_REQUEST['key'] = $row2['PK_Kunde'];
    $residiert = json_decode(include __DIR__ . '/../residiert/bykkey.php');

    $_REQUEST['key'] = $residiert->data->Ort;
    $Ort = json_decode(include __DIR__ . '/../ort/bykey.php');
    $processedKundeData[] = [
      'PK_Kunde' => $row2['PK_Kunde'],
      'Kundennummer' => $row2['Kundennummer'],
      'Firmenname' => $row2['Firmenname'],
      'Email' => $row2['Email'],
      'Passwort' => $row2['Passwort'],
      'Ort' => $Ort->data,
    ];
  }
  return sendSuccesful('default', data: $processedKundeData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}