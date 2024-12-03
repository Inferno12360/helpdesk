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
);

$params2 = array(
  "FK_Ort" => [
    "value" => null,
    "type" => "integer",
  ],
);

foreach ($params2 as $param => $arr) {
  if (!isset($_REQUEST[$param]) || empty($_REQUEST[$param])) {
    throwError('bad_param', "", "Field {$param} is not set");
  } else {
    try {
      $params2[$param]["value"] = castValue($_REQUEST[$param], $arr['type']);
    } catch (Exception $e) {
      throwError("bad_casting_type", data: $e->getMessage());
    }
  }
}

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
  $stmt = $conn->prepare("INSERT INTO kunde (Kundennummer, Firmenname, Email, Passwort)
  VALUES (:Kundennummer, :Firmenname, :Email, :Passwort)");
  foreach ($params as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();

  $insertedKunde = $conn->lastInsertId();

  $stmt = $conn->prepare("INSERT INTO residiert (FK_Ort, FK_Kunde) VALUES (:FK_Ort, :FK_Kunde)");
  $stmt->bindParam(":FK_Kunde", $insertedKunde);
  foreach ($params2 as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();

  $conn->commit();
  return sendSuccesful('default', data: $insertedKunde);
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}