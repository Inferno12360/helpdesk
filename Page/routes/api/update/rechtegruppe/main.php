<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "Administrationsrechte" => [
    "value" => null,
    "type" => "integer",
  ],
  "Bestelllimit" => [
    "value" => null,
    "type" => "double",
  ],
  "Helpdesk_Fernwartung" => [
    "value" => null,
    "type" => "integer",
  ],
  "PK_Rechtegruppe" => [
    "value" => null,
    "type" => "integer",
  ],
);

foreach ($params as $param => $arr) {
  if ($param == "Administrationsrechte") {
    $_REQUEST[$param] = $_REQUEST[$param] == "false" ? 0 : 1;
  }

  if ($param == "Helpdesk_Fernwartung") {
    $_REQUEST[$param] = $_REQUEST[$param] == "false" ? 0 : 1;
  }
  if ((!isset($_REQUEST[$param]) || empty($_REQUEST[$param])) && $param == "Bestelllimit") {
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
    UPDATE `rechtegruppe`
    SET `Administrationsrechte` = :Administrationsrechte, 
        `Bestelllimit` = :Bestelllimit,
        `Helpdesk_Fernwartung` = :Helpdesk_Fernwartung
    WHERE `PK_Rechtegruppe` = :PK_Rechtegruppe
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
  print_r($_REQUEST);
  throwError('dberror', data: $e->getMessage());
}
