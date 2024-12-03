<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `art`");
  $stmt->execute();
  $artData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedArtData = [];
  foreach ($artData as $row) {
    $processedArtData[] = [
      'PK_Art' => $row['PK_Art'],
      'Artname' => $row['Artname'],
      'Beschreibung' => $row['Beschreibung']
    ];
  }
  return sendSuccesful('default', data: $processedArtData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}