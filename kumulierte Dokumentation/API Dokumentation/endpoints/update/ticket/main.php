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
  "PK_Ticket" => [
    "value" => null,
    "type" => "integer",
  ],
);

$params2 = array(
  "PK_Ticket" => [
    "value" => null,
    "type" => "integer",
  ],
  "Dienstleistungen" => [
    "value" => [null],
    "type" => "array",
  ]
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
  $stmt = $conn->prepare("UPDATE `ticket` SET 
    `Ticket_Titel` = :Ticket_Titel, 
    `Beschreibung` = :Beschreibung, 
    `InterneNotiz` = :InterneNotiz, 
    `InternerStatus` = :InternerStatus, 
    `Erstelldatum` = :Erstelldatum, 
    `Bearbeitungsdatum` = :Bearbeitungsdatum, 
    `FK_Status` = :FK_Status, 
    `FK_Priorität` = :FK_Prioritaet, 
    `FK_Art` = :FK_Art, 
    `FK_Mitarbeiter` = :FK_Mitarbeiter, 
    `FK_Kunde` = :FK_Kunde
  WHERE `PK_Ticket` = :PK_Ticket");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      $type = gettype($arr['value']);
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']} is currently {$type}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();

  $stmt = $conn->prepare('DELETE FROM `abgeleitet` WHERE `abgeleitet`.`FK_Ticket` = :fk_ticket');
  $stmt->bindParam(":fk_ticket", $params2['PK_Ticket']['value']);
  $stmt->execute();

  $stmt = $conn->prepare('INSERT INTO `abgeleitet` (FK_Dienstleistung, FK_Ticket) VALUES (:fk_dienstleistung, :PK_Ticket)');
  foreach ($params2["Dienstleistungen"]["value"] as $value) {
    $value = intval($value);
    $stmt->bindParam(":fk_dienstleistung", $value);
    $stmt->bindParam(":PK_Ticket", $params2["PK_Ticket"]["value"]);
    $stmt->execute();
  }
  $conn->commit();
  return sendSuccesful('default');
} catch (PDOException $e) {
  $conn->rollBack();
  throwError('dberror', data: $e->getMessage());
}
