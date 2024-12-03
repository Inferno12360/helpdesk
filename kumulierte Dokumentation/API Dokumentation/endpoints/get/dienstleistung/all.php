<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';


try {
  $stmt = $conn->prepare("SELECT * FROM dienstleistung");
  $stmt->execute();
  $DienstleistungData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedDienstleistungData = [];
  foreach ($DienstleistungData as $row) {
    $processedDienstleistungData[] = [
      'PK_Dienstleistung' => $row['PK_Dienstleistung'],
      'Beschreibung' => $row['Beschreibung'],
      'Kosten' => $row['Kosten'],
    ];
  }
  return sendSuccesful('default', data: $processedDienstleistungData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}