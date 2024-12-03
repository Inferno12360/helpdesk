<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "vorname" => [
    "value" => null,
    "type" => "string",
  ],
  "nachname" => [
    "value" => null,
    "type" => "string",
  ],
  "position" => [
    "value" => null,
    "type" => "string",
  ],
  "festnetznummer" => [
    "value" => null,
    "type" => "string",
  ],
  "mobilnummer" => [
    "value" => null,
    "type" => "string",
  ],
  "email" => [
    "value" => null,
    "type" => "string",
  ],
  "passwort" => [
    "value" => null,
    "type" => "string",
  ],
  "fk_ort" => [
    "value" => null,
    "type" => "integer",
  ],
  "fk_rechtegruppe" => [
    "value" => null,
    "type" => "integer",
  ],
);

$params2 = array(
  "fk_kunde" => [
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
  $stmt = $conn->prepare('INSERT INTO mitarbeiter (Vorname, Nachname, Position, Festnetznummer, Mobilnummer, Email, Passwort, FK_Ort, FK_Rechtegruppe) VALUES (:vorname, :nachname, :position, :festnetznummer, :mobilnummer, :email, :passwort, :fk_ort, :fk_rechtegruppe)');
  foreach ($params as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();

  $insertedMitarbeiter = $conn->lastInsertId();
  $stmt = $conn->prepare('INSERT INTO arbeitet (FK_Kunde, FK_Mitarbeiter) VALUES (:fk_kunde, :fk_mitarbeiter)');
  $stmt->bindParam(":fk_mitarbeiter", $insertedMitarbeiter);
  foreach ($params2 as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $conn->commit();
  return sendSuccesful('default', data: $insertedMitarbeiter);
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}
