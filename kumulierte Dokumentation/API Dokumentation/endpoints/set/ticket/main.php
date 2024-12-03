<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Ticket_Titel" => [
    "value" => null,
    "type" => "string",
  ],
  "Beschreibung" => [
    "value" => null,
    "type" => "string",
  ],
  "InterneNotiz" => [
    "value" => null,
    "type" => "string",
  ],
  "InternerStatus" => [
    "value" => null,
    "type" => "string",
  ],
  "Erstelldatum" => [
    "value" => null,
    "type" => "string",
  ],
  "Bearbeitungsdatum" => [
    "value" => null,
    "type" => "string",
  ],
  "FK_Status" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Prioritaet" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Art" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Mitarbeiter" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Kunde" => [
    "value" => null,
    "type" => "integer",
  ],
);

$params2 = array(
  "fk_dienstleistung" => [
    "value" => [null],
    "type" => "array",
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
  $stmt = $conn->prepare("INSERT INTO `ticket` 
    (`Ticket_Titel`, `Beschreibung`, `InterneNotiz`, `InternerStatus`, `Erstelldatum`, `Bearbeitungsdatum`, `FK_Status`, `FK_Priorität`, `FK_Art`, `FK_Mitarbeiter`, `FK_Kunde`) 
    VALUES (:Ticket_Titel, :Beschreibung, :InterneNotiz, :InternerStatus, :Erstelldatum, :Bearbeitungsdatum, :FK_Status, :FK_Prioritaet, :FK_Art, :FK_Mitarbeiter, :FK_Kunde)");
  foreach ($params as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $insertedTicket = $conn->lastInsertId();

  $stmt = $conn->prepare('INSERT INTO `abgeleitet` (FK_Dienstleistung, FK_Ticket) VALUES (:fk_dienstleistung, :fk_ticket)');
  foreach ($params2["fk_dienstleistung"]["value"] as $value) {
    $value = intval($value);
    $stmt->bindParam(":fk_dienstleistung", $value);
    $stmt->bindParam(":fk_ticket", $insertedTicket);
    $stmt->execute();
  }
  $stmt->execute();

  $conn->commit();
  return sendSuccesful('default', data: $insertedTicket);
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}
