<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `rechtegruppe`");
  $stmt->execute();
  $rechtegruppeData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedRechtegruppeData = [];
  foreach ($rechtegruppeData as $row) {
    $processedRechtegruppeData[] = [
      'PK_Rechtegruppe' => $row['PK_Rechtegruppe'],
      'Administrationsrechte' => $row['Administrationsrechte'],
      'Bestelllimit' => $row['Bestelllimit'],
      'Helpdesk_Fernwartung' => $row['Helpdesk_Fernwartung'],
    ];
  }
  return sendSuccesful('default', data: $processedRechtegruppeData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}