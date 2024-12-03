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
  $stmt = $conn->prepare("SELECT * FROM `mitarbeiter` WHERE `mitarbeiter`.`PK_Mitarbeiter` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $mitarbeiterData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedMitarbeiterData = [];
  foreach ($mitarbeiterData as $row3) {
    $_REQUEST['key'] = $row3['FK_Ort'];
    $Ort = json_decode(include __DIR__ . '/../ort/bykey.php');

    $_REQUEST['key'] = $row3['FK_Rechtegruppe'];
    $Rechtegruppe = json_decode(include __DIR__ . '/../rechtegruppe/bykey.php');

    $_REQUEST['key'] = $row3['PK_Mitarbeiter'];
    $arbeitet = json_decode(include __DIR__ . '/../arbeitet/bymkey.php');

    $_REQUEST['key'] = $arbeitet->data->Kunde;
    $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php');

    $processedMitarbeiterData[] = [
      'PK_Mitarbeiter' => $row3['PK_Mitarbeiter'],
      'Vorname' => $row3['Vorname'],
      'Nachname' => $row3['Nachname'],
      'Position' => $row3['Position'],
      'Festnetznummer' => $row3['Festnetznummer'],
      'Mobilnummer' => $row3['Mobilnummer'],
      'Email' => $row3['Email'],
      'Passwort' => $row3['Passwort'],
      'Ort_Values' => $Ort->data,
      'Rechtegruppe_Values' => $Rechtegruppe->data,
      'Firma' => $kunde->data,
    ];
  }
  return sendSuccesful('default', data: $processedMitarbeiterData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}