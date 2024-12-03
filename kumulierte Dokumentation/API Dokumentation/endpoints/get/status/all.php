<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `status`");
  $stmt->execute();
  $statusData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedStatusData = [];
  foreach ($statusData as $row) {
    $processedStatusData[] = [
      'PK_Status' => $row['PK_Status'],
      'Statusname' => $row['Statusname'],
      'Farbe' => $row['Farbe'],
      'Beschreibung' => $row['Beschreibung']
    ];
  }
  return sendSuccesful('default', data: $processedStatusData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}