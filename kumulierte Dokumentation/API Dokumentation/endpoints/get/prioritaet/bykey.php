<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
  "key" => [
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
  $stmt = $conn->prepare("SELECT * FROM `priorität` WHERE `priorität`.`PK_Priorität` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $prioritaetData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedPrioritaetData = [];
  foreach ($prioritaetData as $row) {
    $processedPrioritaetData[] = [
      'Prioritätsname' => $row['Prioritätsname'],
      'Beschreibung' => $row['Beschreibung'],
      'PK_Priorität' => $row['PK_Priorität']
    ];
  }
  return sendSuccesful('default', data: $processedPrioritaetData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}

