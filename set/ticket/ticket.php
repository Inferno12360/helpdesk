<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (!isset($_REQUEST['key'])) {
    $error = $default["error"]["custom"];
    $error['data'] = "Field key is not set";
    header('Content-Type: application/json');
    errorCaller($error);
    die();
  } else {
    // prepare sql and bind parameters
        $stmt = $conn->prepare("INSERT INTO ticket (PK_Ticket, Ticket_Titel, Beschreibung, Interne-Notiz,`Interner-Status`,Erstelldatum, Bearbeitungsdatum, FK_Status, FK_Priorität, FK_Art, FK_Mitarbeiter, FK_Kunde)
        VALUES (:PK_Ticket, :Ticket_Titel, :Beschreibung, :Interne_Notiz, :Interner_Status, :Erstelldatum, :Bearbeitungsdatum, :FK_Status, :FK_Priorität, :FK_Art, :FK_Mitarbeiter, :FK_Kunde)");
        $stmt->bindParam(':PK_Ticket', $PK_Ticket);
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
        $stmt -> exec();
  }


?>