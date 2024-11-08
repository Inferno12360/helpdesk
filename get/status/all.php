<?php
include_once __DIR__ . '/../../conn.php';
try {
  $mainStmt = $conn->prepare("SELECT * FROM `status`");
  $mainStmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
$status = [];
while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {

  $status[] = [
    'PK_Status' => $mainRow['PK_Status'],
    'Statusname' => $mainRow['Statusname'],
    'Farbe' => $mainRow['Farbe'],
    'Beschreibung' => $mainRow['Beschreibung']
  ];
}
return json_encode($status);
