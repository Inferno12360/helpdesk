<?php
try {
  $handler = new PDO("mysql:host=localhost;dbname=oberstufe_db1", "oberstufe_db1", 'ku7j$YBL7@Eum?NWsm');
  $stmt = $handler->prepare("SELECT * FROM mitarbeiter");
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
print_r($mitarbeiter);
return json_encode($mitarbeiter);
