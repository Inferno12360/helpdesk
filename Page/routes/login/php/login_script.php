<?php
include_once '../../api/conn.php';

try {
    // SQL-Abfragen für Kunden und Mitarbeiter
    $sqlKunde = "SELECT * FROM mainKundenLogin WHERE email = :email AND passwort = :passwort";
    $sqlAdmin = "SELECT * FROM adminUsers WHERE email = :email AND passwort = :passwort";
    $sqlKundeUsers = "SELECT * FROM kundeUsers WHERE email = :email AND passwort = :passwort";

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (!empty($_POST["email"]) && !empty($_POST["passwort"])) {

        $sqlDeleteExpiredSessions = "DELETE FROM `session` WHERE expires_at < NOW()";
        $stmt = $conn->prepare($sqlDeleteExpiredSessions);
        $stmt->execute();
        // Benutzer-Eingaben abholen
        $email = $_POST["email"];
        $passwort = $_POST["passwort"];

        // Abfrage für Kunden vorbereiten
        $statementKunde = $conn->prepare($sqlKunde);
        $statementKunde->bindParam(':email', $email);
        $statementKunde->bindParam(':passwort', $passwort); // Passwort sollte gehasht sein!
        $statementKunde->execute();

        // Abfrage für Mitarbeiter vorbereiten
        $statementAdmin = $conn->prepare($sqlAdmin);
        $statementAdmin->bindParam(':email', $email);
        $statementAdmin->bindParam(':passwort', $passwort);
        $statementAdmin->execute();

        $statementMitarbeiter = $conn->prepare($sqlKundeUsers);
        $statementMitarbeiter->bindParam(':email', $email);
        $statementMitarbeiter->bindParam(':passwort', $passwort);
        $statementMitarbeiter->execute();

        $user = null;

        // Benutzerrolle feststellen
        if ($statementKunde->rowCount() > 0) {
            $user = $statementKunde->fetch(PDO::FETCH_ASSOC);
            $user["role"] = "Kunde";
        }
        if ($statementAdmin->rowCount() > 0) {
            $user = $statementAdmin->fetch(PDO::FETCH_ASSOC);
            $user["role"] = "Mitarbeiter";
        }
        if ($statementMitarbeiter->rowCount() > 0) {
            $user = $statementMitarbeiter->fetch(PDO::FETCH_ASSOC);
            $user["role"] = "Kunde";
        }

        if ($user == null) {
            setcookie("readback", "error-The password or EMail is wrong", [
                "secure" => true,
                "httponly" => false,
                "SameSite" => "Strict",
                "path" => "/",
            ]);
            header("Location: ../index.html");
            exit;

        } else {
            $user["login"] = 1;
        }

        $time = time();
        $sessionhash = base64_encode($user["role"] . "-" . $email . "-" . $time);

        $sessionCreate = $conn->prepare("
    INSERT INTO `session` (sessionhash, expires_at, inserted_at)
    VALUES (:sessionhash, :expiresAt, :insertedAt)
");
        $sessionCreate->bindParam(":sessionhash", $sessionhash);
        $expiresAt = date("Y-m-d H:i:s", $time + (3600 * 4));
        $sessionCreate->bindParam(":expiresAt", $expiresAt);
        $insertTime = date("Y-m-d H:i:s", $time);
        $sessionCreate->bindParam(":insertedAt", $insertTime);
        $sessionCreate->execute();


        setcookie("sessionid", $sessionhash, [
            "expires" => strtotime($expiresAt),
            "secure" => true,
            "httponly" => false,
            "samesite" => "Strict",
            "path" => "/",
        ]);
    } else {
        setcookie("readback", "Some Inputs are missing", [
            "secure" => true,
            "httponly" => false,
            "SameSite" => "Strict",
            "path" => "/",
        ]);
        header("Location: ../index.html");
        exit();
    }

    // Weiterleitung basierend auf der Rolle
    if (isset($user["login"]) && $user["login"] == 1) {
        if ($user["role"] == 'Kunde') {
            header("Location: ../LK/Homepage/Startseite.php");
        } elseif ($user["role"] == 'Mitarbeiter') {
            header("Location: ../../admin/index.html");
        }
    } else {
        header("Location: ../index.html");
        exit();
    }
} catch (PDOException $error) {
    // Fehlermeldung ausgeben
    $message = $error->getMessage();
    echo "Fehler: " . $message;
}
?>