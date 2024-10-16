<?php
include_once __DIR__ . '/../../conn.php';
try {
  $stmt = $conn->prepare("SELECT * FROM mitarbeiter");
  $stmt->execute();
} catch (PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
$mitarbeiter = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $mitarbeiter[] = [
    'PK_Mitarbeiter' => $row['PK_Mitarbeiter'],
    'Vorname' => $row['Vorname'],
    'Nachname' => $row['Nachname'],
    'Position' => $row['Position'],
    'Festnetznummer' => $row['Festnetznummer'],
    'Mobilnummer' => $row['Mobilnummer'],
    'Email' => $row['Email'],
  ];
}
return json_encode($mitarbeiter);
