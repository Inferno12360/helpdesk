<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rechnungsdetails</title>
    <link rel="stylesheet" href="Startseite.css">
</head>
<body>
    <?php include 'navbar.html'; ?>
    <h1 class="center-text"><b>Rechnungsdetails</b></h1>

    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "leon_maurice";

    if (isset($_GET['rechnungsnr'])) {
        $rechnungsnr = $_GET['rechnungsnr'];

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $conn->prepare("
                SELECT 
                    rechnung.Rechnungsnr, 
                    rechnung.Abrechnung, 
                    kunde.Firmenname, 
                    kunde.Kundennummer, 
                    ticket.Ticket_Titel, 
                    ticket.Beschreibung
                FROM rechnung
                INNER JOIN kunde ON rechnung.FK_Kunde = kunde.PK_Kunde
                INNER JOIN ticket ON rechnung.FK_Ticket = ticket.PK_Ticket
                WHERE rechnung.Rechnungsnr = :rechnungsnr
            ");
            $stmt->bindParam(':rechnungsnr', $rechnungsnr);
            $stmt->execute();

            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $row = $stmt->fetch();
            
            if ($row) {
                echo "<h2>Details zur Rechnung " . $row['Rechnungsnr'] . "</h2>";
                echo "<p><b>Abrechnung:</b> " . $row['Abrechnung'] . "</p>";
                echo "<p><b>Kundenname:</b> " . $row['Firmenname'] . "</p>";
                echo "<p><b>Kundennummer:</b> " . $row['Kundennummer'] . "</p>";
                echo "<p><b>Ticket-Titel:</b> " . $row['Ticket_Titel'] . "</p>";
                echo "<p><b>Ticket-Beschreibung:</b> " . $row['Beschreibung'] . "</p>";
            } else {
                echo "<p>Keine Details für diese Rechnung gefunden.</p>";
            }
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

        $conn = null;
    } else {
        echo "<p>Keine Rechnungsnummer angegeben.</p>";
    }
    ?>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
    <?php include 'footer.html'; ?>
</body>
</html>
