<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

try {

  // prepare sql and bind parameters
  $stmt = $conn->prepare("INSERT INTO rechnung (Rechnungsnr, Ticketbeschreibung, Abrechnung, Ratenzahlung, FK_Bezahlungsart, FK_Kunde, FK_Ticket)
  VALUES (:Rechnungsnr, :Ticketbeschreibung, :Abrechnung, :Ratenzahlung, :FK_Bezahlungsart, :FK_Kunde, :FK_Ticket)");
  $stmt->bindParam(':Rechnungsnr', $_POST['Rechnungsnr'] );
  $stmt->bindParam(':Ticketbeschreibung', $_POST['Ticketbeschreibung']);
  $stmt->bindParam(':Abrechnung', $_POST['Abrechnung']);
  $stmt->bindParam(':Ratenzahlung', $_POST['Ratenzahlung']);
  $stmt->bindParam(':FK_Bezahlungsart', $_POST['FK_Bezahlungsart']);
  $stmt->bindParam(':FK_Kunde', $_POST['FK_Kunde']);
  $stmt->bindParam(':FK_Ticket', $_POST['FK_Ticket']);

  $stmt->execute();

  echo "New records created successfully";
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;
?>