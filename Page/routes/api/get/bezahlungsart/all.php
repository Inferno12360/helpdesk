<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `bezahlungsart`");
  $stmt->execute();
  $bezahlungsartData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedBezahlungsartData = [];
  foreach ($bezahlungsartData as $row) {
    $processedBezahlungsartData[] = [
      'PK_Bezahlungsart' => $row['PK_Bezahlungsart'],
      'Beschreibung' => $row['Beschreibung'],
      'Artname' => $row['Artname'],
    ];
  }
  return sendSuccesful('default', data: $processedBezahlungsartData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}