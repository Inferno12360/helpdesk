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
  $stmt = $conn->prepare("SELECT * FROM `dienstleistung` WHERE `dienstleistung`.`PK_Dienstleistung` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $dienstleistungData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedDienstleistungData = [];
  foreach ($dienstleistungData as $row) {
    $processedDienstleistungData[] = [
      'PK_Dienstleistung' => $row['PK_Dienstleistung'],
      'Beschreibung' => $row['Beschreibung'],
      'Kosten' => $row['Kosten'],
    ];
  }
  return sendSuccesful('default', data: $processedDienstleistungData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}