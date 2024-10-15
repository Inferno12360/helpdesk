<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leon_maurice";

if (isset($_GET['ticketid'])) {
    $ticketid = $_GET['ticketid'];

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("DELETE FROM ticket WHERE PK_Ticket = :ticketid");
        $stmt->bindParam(':ticketid', $ticketid);

        $stmt->execute();

        echo "<script>alert('Das Ticket wurde erfolgreich gelöscht.'); window.location.href='rechnung_uebersicht.php';</script>";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    $conn = null;
} else {
    echo "<p>Keine Ticket-ID angegeben.</p>";
}
?>
