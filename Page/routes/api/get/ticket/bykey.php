<?php
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

include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `ticket` WHERE `ticket`.`PK_Ticket` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $ticketData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedTicketData = [];
  foreach ($ticketData as $row5) {
    $_REQUEST['key'] = $row5['FK_Status'];
    $status = json_decode(include __DIR__ . '/../status/bykey.php');

    $_REQUEST['key'] = $row5['FK_Priorität'];
    $prioritaet = json_decode(include __DIR__ . '/../prioritaet/bykey.php');

    $_REQUEST['key'] = $row5['FK_Art'];
    $art = json_decode(include __DIR__ . '/../art/bykey.php');

    $_REQUEST['key'] = $row5['FK_Mitarbeiter'];
    $mitarbeiter_values = json_decode(include __DIR__ . '/../mitarbeiter/bykey.php');

    $_REQUEST['key'] = $row5['FK_Kunde'];
    $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php');

    $_REQUEST['key'] = $row5['PK_Ticket'];
    $bearbeiter = json_decode(include __DIR__ . '/../bearbeitet/bytkey.php');

    $_REQUEST['key'] = $row5['PK_Ticket'];
    $dienstleistung = json_decode(include __DIR__ . '/../abgeleitet/bytkey.php');

    $processedTicketData[] = [
      'PK_Ticket' => $row5['PK_Ticket'],
      'Ticket_Titel' => $row5['Ticket_Titel'],
      'Beschreibung' => $row5['Beschreibung'],
      'Interne_Notiz' => $row5['InterneNotiz'],
      'Interner_Status' => $row5['InternerStatus'],
      'Erstelldatum' => $row5['Erstelldatum'],
      'Bearbeitungsdatum' => $row5['Bearbeitungsdatum'],
      'Status_Values' => $status->data,
      'Priorität_Values' => $prioritaet->data,
      'Art_Values' => $art->data,
      'Mitarbeiter_Values' => $mitarbeiter_values->data,
      'Bearbeiter_Values' => $bearbeiter->data,
      'Dienstleistung_Values' => $dienstleistung->data,
      'Kunde_Values' => $kunde->data,
    ];
  }
  return sendSuccesful('default', data: $processedTicketData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}
