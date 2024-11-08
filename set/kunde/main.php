<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

if (!is_string($_REQUEST['Kundennummer']) || !isset($_REQUEST['Kundennummer'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Kundennummer is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_string($_REQUEST['Firmenname']) || !isset($_REQUEST['Firmenname'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Firmenname is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

try {
  $stmt = $conn->prepare("INSERT INTO kunde (Kundennummer, Firmenname, Email, Passwort)
  VALUES (:Kundennummer, :Firmenname, :Email, :Passwort)");
  $stmt->bindParam(':Kundennummer', $_REQUEST["Kundennummer"]);
  $stmt->bindParam(':Firmenname', $_REQUEST["Firmenname"]);
  $stmt->bindParam(':Email', $_REQUEST["Email"]);
  $stmt->bindParam(':Passwort', $_REQUEST["Passwort"]);
  $stmt->execute();

  echo "New records created successfully";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;
