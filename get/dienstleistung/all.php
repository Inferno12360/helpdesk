<?php

include_once __DIR__ . '/../../conn.php';

try {
  $mainStmt2 = $conn->prepare("SELECT * FROM dienstleistung");
  $mainStmt2->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}

$dienstleistung = [];
while ($mainRow2 = $mainStmt2->fetch(PDO::FETCH_ASSOC)) {
  $dienstleistung[] = [
    'PK_Dienstleistung' => $mainRow2['PK_Dienstleistung'],
    'Beschreibung' => $mainRow2['Beschreibung'],
    'Kosten' => $mainRow2['Kosten'],
  ];
}

return json_encode($dienstleistung);
