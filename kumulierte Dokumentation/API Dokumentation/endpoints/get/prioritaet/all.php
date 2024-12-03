<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {
  $stmt = $conn->prepare("SELECT * FROM `priorität`");
  $stmt->execute();
  $prioritaetData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $processedPrioritaetData = [];
  foreach ($prioritaetData as $row) {
    $processedPrioritaetData[] = [
      'Prioritätsname' => $row['Prioritätsname'],
      'Beschreibung' => $row['Beschreibung'],
      'PK_Priorität' => $row['PK_Priorität']
    ];
  }
  return sendSuccesful('default', data: $processedPrioritaetData);
} catch (PDOException $e) {
  throwError('dberror', data: $e->getMessage());
}