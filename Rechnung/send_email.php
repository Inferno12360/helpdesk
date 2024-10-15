<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $rechnungsnummer = $_POST['rechnungsnummer'];
    $ticketnummer = $_POST['ticketnummer'];
    $kunde = $_POST['kunde'];

    $to = "Kunden E-Mail";
    $subject = "Ihre Rechnung für Ticketnummer: $ticketnummer";
    $message = "Hier sind die Rechnungsdetails:\n\n";
    $message .= "Rechnungsnummer: $rechnungsnummer\n";
    $message .= "Ticketnummer: $ticketnummer\n";
    $message .= "Kunde: $kunde\n";

    $headers = "From: noreply@deinewebsite.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "E-Mail gesendet!";
    } else {
        echo "Fehler beim Senden der E-Mail.";
    }
}
?>
