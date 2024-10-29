Dies ist der Startpunkt in der "Helpdesk" API, hier wird erklärt, wie/wo und mit was die API angefragt werden kann.

##### Wie verbinde ich mich zum Server?

Die Verbindung zum Server erfolgt mit der [Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication) zu der [URL](https://oberstufe.v2201910106725100809.hotsrv.de/helpdesk/API/api.php) solltest du keine Zugangsdaten haben bitte schreibe mich unter unter dieser [E-Mail](mailto:taw.kontakt+helpdesk@gmail.com).

##### Was muss ich dem api.php Endpunkt geben?

Der Endpunkt funktioniert darin, dass er ein Gateway/Router darstellt, er nimmt alle Daten an und gibt diese an den anzusprechenden Endpoint weiter.

Damit dies funktioniert muss die [URL](https://oberstufe.v2201910106725100809.hotsrv.de/helpdesk/API/api.php) mit der [POST](https://en.wikipedia.org/wiki/POST_(HTTP)) Methode angesprochen werden und braucht innerhalb der POST Methode muss dann verschlüsselt durch die [x-www-form-urlencoded](https://en.wikipedia.org/wiki/Percent-encoding#The_application/x-www-form-urlencoded_type)-Verschlüsselung ein Feld mit dem Namen "method" übergeben werden.

Dieses "method" Feld sieht immer in einer bestimmten Reihenfolge aus
`{}{typ}{tabelle}{art}` [siehe Glossar](Glossar%20of%20Methods.md).

Diese Methoden haben, dann verschiedene Felder welche gesetzt werden müssen. 
Hier siehe entweder das [Glossar of Methods](Glossar%20of%20Methods.md) oder spreche die [URL](https://oberstufe.v2201910106725100809.hotsrv.de/helpdesk/API/api.php) mit der [OPTIONS](https://en.wikipedia.org/wiki/HTTP#Request_methods) Request Methode an und übergebe ein Feld "method", um genauere Informationen zum jeweiligen API Endpunkt zu erhalten, sollten diese Informationen nicht ausreichen bitte erreichen Sie uns unter der [E-Mail](mailto:taw.kontakt+helpdesk@gmail.com).

