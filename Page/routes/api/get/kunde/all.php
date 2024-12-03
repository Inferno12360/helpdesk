<?php

include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM kunde");
  $stmt->execute();
  $kundeData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedKundeData = [];
  foreach ($kundeData as $row2) {
    $_REQUEST['key'] = $row2['PK_Kunde'];
    $residiert = json_decode(include __DIR__ . '/../residiert/bykkey.php');

    $_REQUEST['key'] = $residiert->data->Ort;
    $Ort = json_decode(include __DIR__ . '/../ort/bykey.php');
    $processedKundeData[] = [
      'PK_Kunde' => $row2['PK_Kunde'],
      'Kundennummer' => $row2['Kundennummer'],
      'Firmenname' => $row2['Firmenname'],
      'Email' => $row2['Email'],
      'Passwort' => $row2['Passwort'],
      'Ort' => $Ort->data,
    ];
  }
  return sendSuccesful('default', data: $processedKundeData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}