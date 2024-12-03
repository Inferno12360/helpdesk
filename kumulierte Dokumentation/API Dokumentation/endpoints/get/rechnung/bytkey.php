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
  $stmt = $conn->prepare("SELECT * FROM `rechnung` WHERE `rechnung`.`FK_Ticket` = :key");
  foreach ($params as $param => $arr) {
    if (gettype($arr['value']) != $arr["type"]) {
      throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
    }
    $stmt->bindValue(":" . $param, $arr["value"]);
  }
  $stmt->execute();
  $rechnungData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedRechnungData = [];
  foreach ($rechnungData as $row4) {
    $_REQUEST['key'] = $row4['FK_Kunde'];
    $kunde = json_decode(include __DIR__ . '/../kunde/bykey.php');

    $_REQUEST['key'] = $row4['FK_Ticket'];
    $ticket = json_decode(include __DIR__ . '/../ticket/bykey.php');

    $_REQUEST['key'] = $row4['FK_Bezahlungsart'];
    $bezahlungsart = json_decode(include __DIR__ . '/../bezahlungsart/bykey.php');

    $processedRechnungData[] = [
      'Rechnungsnr' => $row4['Rechnungsnr'],
      'Ticketbeschreibung' => $row4['Ticketbeschreibung'],
      'Abrechnung' => $row4['Abrechnung'],
      'Ratenzahlung' => $row4['Ratenzahlung'],
      'Kunde_Values' => $kunde->data,
      'Ticket_Values' => $ticket->data,
      'Bezahlungsart_Values' => $bezahlungsart->data,
    ];
  }
  return sendSuccesful('default', data: $processedRechnungData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}