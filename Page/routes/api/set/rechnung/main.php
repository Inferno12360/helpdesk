<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Ticketbeschreibung" => [
    "value" => null,
    "type" => "string",
  ],
  "Abrechnung" => [
    "value" => null,
    "type" => "string",
  ],
  "Ratenzahlung" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Bezahlungsart" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Kunde" => [
    "value" => null,
    "type" => "integer",
  ],
  "FK_Ticket" => [
    "value" => null,
    "type" => "integer",
  ],
);

foreach ($params as $param => $arr) {
  if (!isset($_REQUEST[$param])) {
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
  $stmt = $conn->prepare("INSERT INTO rechnung (Ticketbeschreibung, Abrechnung, Ratenzahlung, FK_Bezahlungsart, FK_Kunde, FK_Ticket)
  VALUES (:Ticketbeschreibung, :Abrechnung, :Ratenzahlung, :FK_Bezahlungsart, :FK_Kunde, :FK_Ticket)");
  foreach ($params as $param => $arr) {
    $arr['value'] = castValue($arr["value"], $arr['type']);
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $id = $conn->lastInsertId();
  $conn->commit();
  return sendSuccesful('default', data: $id);
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}