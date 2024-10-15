<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rechnungsübersicht</title>
    <link rel="stylesheet" href="Startseite.css">
</head>
<body>
    <?php include 'navbar.html'; ?>
    <h1 class="center-text"><b>Rechnungsübersicht</b></h1>

    <form method="GET" action="">
    <input type="text" name="search" class="search-box" placeholder="Ticket suchen..." value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
    <input type="submit" value="Suchen">
</form>

    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "leon_maurice";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $searchQuery = "";
        if (isset($_GET['search']) && !empty($_GET['search'])) {
            $search = $_GET['search'];
            $searchQuery = " WHERE ticket.Ticket_Titel LIKE :search OR rechnung.Rechnungsnr LIKE :search";
        }

        $stmt = $conn->prepare("
            SELECT 
                rechnung.Rechnungsnr, 
                rechnung.Abrechnung, 
                kunde.Firmenname, 
                ticket.PK_Ticket, 
                ticket.Ticket_Titel
            FROM rechnung
            INNER JOIN kunde ON rechnung.FK_Kunde = kunde.PK_Kunde
            INNER JOIN ticket ON rechnung.FK_Ticket = ticket.PK_Ticket
            $searchQuery
        ");

        if (!empty($searchQuery)) {
            $stmt->bindValue(':search', '%' . $search . '%');
        }

        $stmt->execute();

        echo "<table border='1'>";
        echo "<tr><th>Rechnungsnummer</th><th>Abrechnung</th><th>Kundenname</th><th>Ticketbezahlung</th><th>Details</th><th>Löschen</th></tr>";

        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        foreach(new RecursiveArrayIterator($stmt->fetchAll()) as $row) {
            echo "<tr>";
            echo "<td>" . $row['Rechnungsnr'] . "</td>";
            echo "<td>" . $row['Abrechnung'] . "</td>";
            echo "<td>" . $row['Firmenname'] . "</td>";
            echo "<td>" . $row['Ticket_Titel'] . "</td>";
            echo "<td><a href='rechnung_details.php?rechnungsnr=" . $row['Rechnungsnr'] . "'><button>Details</button></a></td>";
            echo "<td><a href='ticket_delete.php?ticketid=" . $row['PK_Ticket'] . "' onclick=\"return confirm('Willst du dieses Ticket wirklich löschen?');\"><button>Löschen</button></a></td>";
            echo "</tr>";
        }
        echo "</table>";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    $conn = null;
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
    <?php include 'footer.html'; ?>
</body>
</html>