<?php
include_once __DIR__ . '/../../conn.php';
try {
  $mainStmt2 = $conn->prepare("SELECT * FROM kunde");
  $mainStmt2->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}

$kunde = [];
while ($mainRow2 = $mainStmt2->fetch(PDO::FETCH_ASSOC)) {
  $kunde[] = [
    'PK_Kunde' => $mainRow2['PK_Kunde'],
    'Kundennummer' => $mainRow2['Kundennummer'],
    'Firmenname' =>  $mainRow2['Firmenname'],
    'Email' =>  $mainRow2['Email'],
    'Passwort' =>  $mainRow2['Passwort'],
  ];
}

return json_encode($kunde);
