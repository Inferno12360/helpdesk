<?php
include_once __DIR__ . '/../../conn.php';
try {
  $mainStmt = $conn->prepare("SELECT * FROM art");
  $mainStmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
$art = [];
while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {

  $art[] = [
    'PK_Art' => $mainRow['PK_Art'],
    'Artname' => $mainRow['Artname'],
    'Beschreibung' => $mainRow['Beschreibung']
  ];
}
return json_encode($art);
