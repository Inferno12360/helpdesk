<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Stadt" => [
    "value" => null,
    "type" => "string",
  ],
  "PLZ" => [
    "value" => null,
    "type" => "string",
  ],
  "Strasse" => [
    "value" => null,
    "type" => "string",
  ],
  "Hausnummer" => [
    "value" => null,
    "type" => "string",
  ],
  "PK_Ort" => [
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
  $conn->beginTransaction();
  $stmt = $conn->prepare("
    UPDATE `ort`
    SET `Stadt` = :Stadt, 
        `PLZ` = :PLZ, 
        `Straße` = :Strasse, 
        `Hausnummer` = :Hausnummer
    WHERE `PK_Ort` = :PK_Ort
  ");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $conn->commit();
  return sendSuccesful('default');
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}
