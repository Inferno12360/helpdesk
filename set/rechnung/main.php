<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

if (!is_string($_REQUEST['Rechnungsnr']) || !isset($_REQUEST['Rechnungsnr'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Rechnungsnr is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_string($_REQUEST['Ticketbeschreibung']) || !isset($_REQUEST['Ticketbeschreibung'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Ticketbeschreibung is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_string($_REQUEST['Abrechnung']) || !isset($_REQUEST['Abrechnung'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Abrechnung is malformed, please send an string";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_bool($_REQUEST['Ratenzahlung']) || !isset($_REQUEST['Ratenzahlung'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field Ratenzahlung is malformed, please send an boolean";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Bezahlungsart']) || !isset($_REQUEST['FK_Bezahlungsart'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Bezahlungsart is malformed, please send an integer";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}
if (!is_int($_REQUEST['FK_Kunde']) || !isset($_REQUEST['FK_Kunde'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Kunde is malformed, please send an integer";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}

if (!is_int($_REQUEST['FK_Ticket']) || !isset($_REQUEST['FK_Ticket'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field FK_Ticket is malformed, please send an integer";
  header('Content-Type: application/json');
  errorCaller($error);
  die();
}


try {
  // prepare sql and bind parameters
  $stmt = $conn->prepare("INSERT INTO rechnung (Rechnungsnr, Ticketbeschreibung, Abrechnung, Ratenzahlung, FK_Bezahlungsart, FK_Kunde, FK_Ticket)
  VALUES (:Rechnungsnr, :Ticketbeschreibung, :Abrechnung, :Ratenzahlung, :FK_Bezahlungsart, :FK_Kunde, :FK_Ticket)");
  $stmt->bindParam(':Rechnungsnr', $_POST['Rechnungsnr']);
  $stmt->bindParam(':Ticketbeschreibung', $_POST['Ticketbeschreibung']);
  $stmt->bindParam(':Abrechnung', $_POST['Abrechnung']);
  $stmt->bindParam(':Ratenzahlung', $_POST['Ratenzahlung']);
  $stmt->bindParam(':FK_Bezahlungsart', $_POST['FK_Bezahlungsart']);
  $stmt->bindParam(':FK_Kunde', $_POST['FK_Kunde']);
  $stmt->bindParam(':FK_Ticket', $_POST['FK_Ticket']);

  $stmt->execute();

  echo "New records created successfully";
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;