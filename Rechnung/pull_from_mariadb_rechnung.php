<?php
// 1. Verbindungseinstellungen zur Datenbank
$host = 'localhost'; // Oder der Hostname des MariaDB-Servers
$dbname = 'deine_datenbank'; // Name deiner Datenbank
$user = 'dein_benutzername'; // Benutzername für die Datenbank
$pass = 'dein_passwort'; // Passwort für die Datenbank

try {
    // 2. Verbindung zur MariaDB herstellen
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 3. SQL-Abfrage, um die relevanten Daten abzurufen
    // Diese Abfrage zieht die relevanten Daten für die PDF-Erstellung aus der Tabelle 'dienstleistungen'
    $stmt = $pdo->prepare("SELECT dienstleistung, beschreibung, preis FROM dienstleistungen WHERE rechnung_id = :rechnung_id");

    // 4. Die Rechnungs-ID als Parameter einbinden, falls eine spezifische Rechnung abgerufen werden soll
    // Diesen Wert kannst du dynamisch übergeben, z.B. über eine GET- oder POST-Anfrage
    $rechnung_id = isset($_GET['rechnung_id']) ? $_GET['rechnung_id'] : 1; // Standardmäßig Rechnung mit ID 1
    $stmt->bindParam(':rechnung_id', $rechnung_id, PDO::PARAM_INT);

    // 5. SQL-Abfrage ausführen
    $stmt->execute();

    // 6. Ergebnis als assoziatives Array abrufen
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 7. Ergebnis als JSON zurückgeben
    header('Content-Type: application/json'); // Setze den Content-Type auf JSON
    echo json_encode($result);

} catch (PDOException $e) {
    // 8. Im Fehlerfall eine entsprechende JSON-Antwort zurückgeben
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
