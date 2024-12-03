<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM mitarbeiter");
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