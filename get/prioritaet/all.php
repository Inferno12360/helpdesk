<?php
include_once __DIR__ . '/../../conn.php';
try {
  $mainStmt = $conn->prepare("SELECT * FROM priorität");
  $mainStmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
$priorität = [];
while ($mainRow = $mainStmt->fetch(PDO::FETCH_ASSOC)) {

  $priorität[] = [
    'Prioritätsname' => $mainRow['Prioritätsname'],
    'Beschreibung' => $mainRow['Beschreibung'],
    'PK_Priorität' => $mainRow['PK_Priorität']
  ];
}
return json_encode($priorität);
