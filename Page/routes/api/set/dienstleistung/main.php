<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "beschreibung" => [
    "value" => null,
    "type" => "string",
  ],
  "kosten" => [
    "value" => null,
    "type" => "double",
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
  $stmt = $conn->prepare("INSERT INTO dienstleistung (Beschreibung, Kosten) VALUES (:beschreibung, :kosten)");
  foreach ($params as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $conn->commit();
  return sendSuccesful('default', data: $conn->lastInsertId());
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}