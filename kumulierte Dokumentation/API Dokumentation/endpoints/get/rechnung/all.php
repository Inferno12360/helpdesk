<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `rechnung`");
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