<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Vorname" => [
    "value" => null,
    "type" => "string",
  ],
  "Nachname" => [
    "value" => null,
    "type" => "string",
  ],
  "Position" => [
    "value" => null,
    "type" => "string",
  ],
  "Festnetznummer" => [
    "value" => null,
    "type" => "string",
  ],
  "Mobilnummer" => [
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
  "FK_Ort" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Rechtegruppe" => [
    "value" => null,
    "type" => "integer",
  ],
  "PK_Mitarbeiter" => [
    "value" => null,
    "type" => "integer",
  ],
);

$params2 = array(
  "PK_Mitarbeiter" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Kunde" => [
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

try {
  $conn->beginTransaction();
  $stmt = $conn->prepare("
    UPDATE `mitarbeiter`
    SET `Vorname` = :Vorname, 
        `Nachname` = :Nachname, 
        `Position` = :Position, 
        `Festnetznummer` = :Festnetznummer, 
        `Mobilnummer` = :Mobilnummer, 
        `Email` = :Email, 
        `Passwort` = :Passwort, 
        `FK_Ort` = :FK_Ort, 
        `FK_Rechtegruppe` = :FK_Rechtegruppe
    WHERE `PK_Mitarbeiter` = :PK_Mitarbeiter
  ");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();

  $stmt = $conn->prepare('UPDATE arbeitet SET FK_Kunde = :FK_Kunde WHERE `PK_Mitarbeiter` = :PK_Mitarbeiter');
  foreach ($params2 as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $conn->commit();
  return sendSuccesful('default');
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}
