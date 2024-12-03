<!--Broken-->

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['pdf'])) {
    $rechnungsnummer = $_POST['rechnungsnummer'] ?? 'Unbekannt';
    $ticketnummer = $_POST['ticketnummer'] ?? 'Unbekannt';
    $kunde = $_POST['kunde'] ?? 'Unbekannt';
    $to = $_POST['email'] ?? 'empfaenger@example.com';
    $subject = $_POST['subject'] ?? 'Ihre Rechnung';
    $message = "Sehr geehrter Kunde,\n\nanbei finden Sie Ihre Rechnung.\n\nMit freundlichen Grüßen,\nIhr Team";

    $tmpFilePath = $_FILES['pdf']['tmp_name'];
    $fileName = $_FILES['pdf']['name'];
    $fileType = $_FILES['pdf']['type'];

    if (file_exists($tmpFilePath)) {
        $fileContent = chunk_split(base64_encode(file_get_contents($tmpFilePath)));

        $boundary = md5(uniqid(time()));

        $headers = "From: noreply@deinewebsite.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";

        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $message . "\r\n\r\n";

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $fileContent . "\r\n\r\n";
        $body .= "--$boundary--";

        if (mail($to, $subject, $body, $headers)) {
            echo "E-Mail mit Anhang erfolgreich gesendet!";
        } else {
            echo "Fehler beim Senden der E-Mail.";
        }
    } else {
        echo "Fehler: Datei wurde nicht hochgeladen.";
    }
} else {
    echo "Ungültige Anfrage.";
}
?>
