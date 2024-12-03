<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Kundennummer" => [
    "value" => null,
    "type" => "string",
  ],
  "Firmenname" => [
    "value" => null,
    "type" => "string",
  ],
  "Email" => [
    "value" => null,
    "type" => "string",
  ],
  "Passwort" => [
    "value" => null,
    "type" => "string",
  ],
  "PK_Kunde" => [
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
    UPDATE `kunde`
    SET `Kundennummer` = :Kundennummer, 
        `Firmenname` = :Firmenname, 
        `Email` = :Email, 
        `Passwort` = :Passwort
    WHERE `PK_Kunde` = :PK_Kunde
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
