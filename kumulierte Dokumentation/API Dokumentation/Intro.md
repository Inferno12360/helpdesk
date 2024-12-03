# API Dokumentation

**Wie spricht man die API an?**
Die API ist lokalisiert im „$root$/routes/api/api.php“, „$root$“ hierbei ist der oberste Ordner worin auch die erste „index.html“ enthalten ist. 

Grundlegend ist die API immer mit ähnelndem Schema anzusprechen. Die API muss immer mit der POST HTTP Request Method angesprochen werden. Es wird immer ein Parameter „method“ benötigen dieser Parameter sieht auch immer ähnlich aus. Als erstes wird immer eine Aktion kommen, bei der jetzigen Ausführung gibt es die Aktionen „get“, „set“, „delete“, „update“, „option“. Darauf folgt immer einer der zusammenfassenden Begriffe, was im jetzigem Moment die Tabellenstruktur der Datenbank widerspiegelt, also „mitarbeiter“, „kunde“, usw. Anschließend wird einer von bestimmten Worten erwartet, Beispielsweise „bykey“, „all“, „main“. Damit kommt als Parameter „method“ beispielsweise der Wert „getmitarbeiterall“ herraus. Sollte danach der Endpunkt weitere Parameter benötigen, dann wird dieser Endpunkt es in folgender Antwort Struktur dem vorherigem Skript mitteilen. 

<hr>

**Antwortstruktur**
Die API antwortet immer im Content Type JSON mit diesem Teilen, „status“, „msg“, „data“, „code“. Im „status“ werden immer entweder „error“ für einen Fehler drinnen stehen oder „success“ sofern, dass Skript so ausgeführt ist, wie es gemeint wurde. Die „msg“ wird immer eine in Englisch geschriebene Generische Nachricht enthalten, die auch dem User angezeigt werden kann. „data“ enthält immer die automatisch erstellte Nachricht oder nichts. Zum Schluss sollte „code“ den korrekten HTTP Response Code enthalten.