<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leon_maurice";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['id'])) {
        $mitarbeiter_id = $_GET['id'];

        $sql = "SELECT Vorname, Nachname, Position, Festnetznummer, Mobilnummer, Email FROM mitarbeiter WHERE PK_Mitarbeiter = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $mitarbeiter_id, PDO::PARAM_INT);
        $stmt->execute();

        $mitarbeiter = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$mitarbeiter) {
            echo "Mitarbeiter nicht gefunden.";
        }

    } else {
        echo "Keine Mitarbeiter-ID übergeben.";
        exit;
    }

} catch(PDOException $e) {
    echo "Verbindung fehlgeschlagen: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Mitarbeiter Details</title>
</head>
<body>
    <h1>Mitarbeiter Details</h1>

    <?php if ($mitarbeiter): ?>
    <ul>
        <li><strong>Vorname:</strong> <?php echo htmlspecialchars($mitarbeiter['Vorname']); ?></li>
        <li><strong>Nachname:</strong> <?php echo htmlspecialchars($mitarbeiter['Nachname']); ?></li>
        <li><strong>Position:</strong> <?php echo htmlspecialchars($mitarbeiter['Position']); ?></li>
        <li><strong>Festnetznummer:</strong> <?php echo htmlspecialchars($mitarbeiter['Festnetznummer']); ?></li>
        <li><strong>Mobilnummer:</strong> <?php echo htmlspecialchars($mitarbeiter['Mobilnummer']); ?></li>
        <li><strong>Email:</strong> <?php echo htmlspecialchars($mitarbeiter['Email']); ?></li>
    </ul>
    <a href="javascript:history.back()">Zurück</a>
    <?php endif; ?>
</body>
</html>
