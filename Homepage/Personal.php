<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leon_maurice";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT PK_Mitarbeiter, Vorname, Nachname, Position FROM mitarbeiter";
    
    if (isset($_POST['search'])) {
        $search_term = "%" . $_POST['search_term'] . "%";
        $sql .= " WHERE Vorname LIKE :search_term OR Nachname LIKE :search_term OR Position LIKE :search_term";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':search_term', $search_term, PDO::PARAM_STR);
        $stmt->execute();
    } else {
        $stmt = $conn->query($sql);
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
    echo "Verbindung fehlgeschlagen: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Personal - TLJMLT GmbH</title>
    <link rel="stylesheet" href="Startseite.css">
</head>
<body>
    <?php include 'navbar.html'; ?>
    <h1 class="center-text"><b>Personal</b></h1>

    <main>
        <h2>Unser Team</h2>

        <form method="POST" action="">
            <input type="text" name="search_term" placeholder="Mitarbeiter suchen">
            <button type="submit" name="search">Suchen</button>
        </form>

        <table border="1">
            <thead>
                <tr>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Position</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if (!empty($results)) {
                    foreach ($results as $row) {
                        echo "<tr><td>" . htmlspecialchars($row["Vorname"]) . "</td><td>" . htmlspecialchars($row["Nachname"]) . "</td><td>" . htmlspecialchars($row["Position"]) . "</td>";
                        echo "<td><a href='mitarbeiter_details.php?id=" . $row["PK_Mitarbeiter"] . "'>Details</a></td></tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Keine Mitarbeiter gefunden</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </main>

    <?php include 'footer.html'; ?>
</body>
</html>
