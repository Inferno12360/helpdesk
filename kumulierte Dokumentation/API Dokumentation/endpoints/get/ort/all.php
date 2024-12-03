<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `ort`");
  $stmt->execute();
  $ortData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedOrtData = [];
  foreach ($ortData as $row) {
    $processedOrtData[] = [
      'PK_Ort' => $row['PK_Ort'],
      'Stadt' => $row['Stadt'],
      'PLZ' => $row['PLZ'],
      'Straße' => $row['Straße'],
      'Hausnummer' => $row['Hausnummer'],
    ];
  }
  return sendSuccesful('default', data: $processedOrtData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}