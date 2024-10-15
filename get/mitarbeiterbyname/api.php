<?php
include("../../conn.php");

$stmt = $conn->prepare("SELECT * FROM Mitarbeiter");
$stmt->execute();
$mitarbeiter = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $mitarbeiter[] = [
    'PK_Mitarbeiter' => $row['PK_Mitarbeiter'],
    'Vorname' => $row['Vorname'],
    'Nachname' => $row['Nachname']
  ];
}
return json_encode($mitarbeiter);