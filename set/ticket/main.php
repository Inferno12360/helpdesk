<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

if (!is_string($_REQUEST['Ticket_Titel']) || !isset($_REQUEST['Ticket_Titel'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Ticket_Titel is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_string($_REQUEST['Beschreibung']) || !isset($_REQUEST['Beschreibung'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Beschreibung is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_string($_REQUEST['Interne_Notiz']) || !isset($_REQUEST['Interne_Notiz'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Interne_Notiz is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_string($_REQUEST['Interner_Status']) || !isset($_REQUEST['Interner_Status'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Interner_Status is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (DateTime::createFromFormat('Y-m-d', $_REQUEST['Erstelldatum']) !== false || !isset($_REQUEST['Erstelldatum'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Kundennummer is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (DateTime::createFromFormat('Y-m-d', $_REQUEST['Bearbeitungsdatum']) !== false || !isset($_REQUEST['Bearbeitungsdatum'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Bearbeitungsdatum is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_int($_REQUEST['FK_Status']) || !isset($_REQUEST['FK_Status'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Status is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Priorität']) || !isset($_REQUEST['FK_Priorität'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Priorität is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Art']) || !isset($_REQUEST['FK_Art'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Art is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Mitarbeiter']) || !isset($_REQUEST['FK_Mitarbeiter'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Mitarbeiter is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Kunde']) || !isset($_REQUEST['FK_Kunde'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Kunde is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}



try {
  $stmt = $conn->prepare("INSERT INTO ticket (Ticket_Titel, Beschreibung, Interne-Notiz,`Interner-Status`,Erstelldatum, Bearbeitungsdatum, FK_Status, FK_Priorität, FK_Art, FK_Mitarbeiter, FK_Kunde)
        VALUES (:Ticket_Titel, :Beschreibung, :Interne_Notiz, :Interner_Status, :Erstelldatum, :Bearbeitungsdatum, :FK_Status, :FK_Priorität, :FK_Art, :FK_Mitarbeiter, :FK_Kunde)");
  $stmt->bindParam(':Ticket_Titel', $Ticket_Titel);
  $stmt->bindParam(':Beschreibung', $Beschreibung);
  $stmt->bindParam(':Interne_Notiz', $Interne_Notiz);
  $stmt->bindParam(':Interner_Status', $Interner_Status);
  $stmt->bindParam(':Erstelldatum', $Erstelldatum);
  $stmt->bindParam(':Bearbeitungsdatum', $Bearbeitungsdatum);
  $stmt->bindParam(':FK_Status', $FK_Status);
  $stmt->bindParam(':FK_Priorität', $FK_Priorität);
  $stmt->bindParam(':FK_Art', $FK_Art);
  $stmt->bindParam(':FK_Mitarbeiter', $FK_Mitarbeiter);
  $stmt->bindParam(':FK_Kunde', $FK_Kunde);
  $stmt->execute();
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}