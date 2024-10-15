-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Okt 2024 um 13:53
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `helpdesk`
--
CREATE DATABASE IF NOT EXISTS `helpdesk` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `helpdesk`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `abgeleitet`
--

DROP TABLE IF EXISTS `abgeleitet`;
CREATE TABLE `abgeleitet` (
  `FK_Dienstleistung` int(11) NOT NULL,
  `FK_Ticket` int(11) NOT NULL,
  `Kosten` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `abgeleitet`
--

INSERT INTO `abgeleitet` (`FK_Dienstleistung`, `FK_Ticket`, `Kosten`) VALUES
(1, 1, 150.50),
(2, 2, 300.00),
(3, 3, 75.00),
(4, 4, 200.00),
(5, 5, 500.00);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `art`
--

DROP TABLE IF EXISTS `art`;
CREATE TABLE `art` (
  `PK_Art` int(11) NOT NULL,
  `Artname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `art`
--

INSERT INTO `art` (`PK_Art`, `Artname`, `Beschreibung`) VALUES
(1, 'Wartung', 'Regelmäßige Wartung'),
(2, 'Fehlerbehebung', 'Behebung von Softwarefehlern'),
(3, 'Installation', 'Installation neuer Hardware oder Software'),
(4, 'Upgrade', 'System-Upgrade'),
(5, 'Beratung', 'IT-Beratung');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bearbeitet`
--

DROP TABLE IF EXISTS `bearbeitet`;
CREATE TABLE `bearbeitet` (
  `FK_Mitarbeiter` int(11) NOT NULL,
  `FK_Ticket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `bearbeitet`
--

INSERT INTO `bearbeitet` (`FK_Mitarbeiter`, `FK_Ticket`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bezahlungsart`
--

DROP TABLE IF EXISTS `bezahlungsart`;
CREATE TABLE `bezahlungsart` (
  `Artname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Bezahlungsart` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `bezahlungsart`
--

INSERT INTO `bezahlungsart` (`Artname`, `Beschreibung`, `PK_Bezahlungsart`) VALUES
('Kreditkarte', 'Zahlung per Kreditkarte', 1),
('Überweisung', 'Banküberweisung', 2),
('Paypal', 'Zahlung per Paypal', 3),
('Barzahlung', 'Zahlung in bar', 4),
('Kryptowährung', 'Zahlung mit Bitcoin', 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dienstleistung`
--

DROP TABLE IF EXISTS `dienstleistung`;
CREATE TABLE `dienstleistung` (
  `PK_Dienstleistung` int(11) NOT NULL,
  `Beschreibung` text DEFAULT NULL,
  `Kosten` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `dienstleistung`
--

INSERT INTO `dienstleistung` (`PK_Dienstleistung`, `Beschreibung`, `Kosten`) VALUES
(1, 'Serverwartung', 150.50),
(2, 'Softwareinstallation', 300.00),
(3, 'Netzwerkinstallation', 75.00),
(4, 'Hardware-Reparatur', 200.00),
(5, 'Consulting', 500.00);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `eigene_firma`
--

DROP TABLE IF EXISTS `eigene_firma`;
CREATE TABLE `eigene_firma` (
  `PK_EigeneFirma` int(255) NOT NULL,
  `Firmenename` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `eigene_firma`
--

INSERT INTO `eigene_firma` (`PK_EigeneFirma`, `Firmenename`) VALUES
(1, 'TechCorp'),
(2, 'MediTech'),
(3, 'EduSoft'),
(4, 'HealthInc'),
(5, 'EcoSolutions');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `intern_residiert`
--

DROP TABLE IF EXISTS `intern_residiert`;
CREATE TABLE `intern_residiert` (
  `FK_Ort` int(11) NOT NULL,
  `FK_EigeneFirma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `intern_residiert`
--

INSERT INTO `intern_residiert` (`FK_Ort`, `FK_EigeneFirma`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kunde`
--

DROP TABLE IF EXISTS `kunde`;
CREATE TABLE `kunde` (
  `PK_Kunde` int(11) NOT NULL,
  `Kundennummer` varchar(255) DEFAULT NULL,
  `Firmenname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `kunde`
--

INSERT INTO `kunde` (`PK_Kunde`, `Kundennummer`, `Firmenname`) VALUES
(1, 'K001', 'Firma Alpha'),
(2, 'K002', 'Firma Beta'),
(3, 'K003', 'Firma Gamma'),
(4, 'K004', 'Firma Delta'),
(5, 'K005', 'Firma Epsilon');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitarbeiter`
--

DROP TABLE IF EXISTS `mitarbeiter`;
CREATE TABLE `mitarbeiter` (
  `PK_Mitarbeiter` int(11) NOT NULL,
  `Vorname` varchar(255) DEFAULT NULL,
  `Nachname` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL,
  `Festnetznummer` varchar(20) DEFAULT NULL,
  `Mobilnummer` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `FK_Ort` int(11) DEFAULT NULL,
  `FK_Rechtegruppe` int(11) DEFAULT NULL,
  `FK_EigeneFirma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `mitarbeiter`
--

INSERT INTO `mitarbeiter` (`PK_Mitarbeiter`, `Vorname`, `Nachname`, `Position`, `Festnetznummer`, `Mobilnummer`, `Email`, `FK_Ort`, `FK_Rechtegruppe`, `FK_EigeneFirma`) VALUES
(1, 'Max', 'Mustermann', 'Techniker', '030-1234567', '0176-12345678', 'max@techcorp.de', 1, 1, 1),
(2, 'Erika', 'Musterfrau', 'Sekretärin', '040-9876543', '0176-98765432', 'erika@meditech.de', 2, 2, 2),
(3, 'Hans', 'Müller', 'Entwickler', '089-5555555', '0176-55555555', 'hans@edusoft.de', 3, 1, 3),
(4, 'Julia', 'Schmidt', 'Projektleiterin', '0221-6666666', '0176-66666666', 'julia@healthinc.de', 4, 3, 4),
(5, 'Peter', 'Beispiel', 'Manager', '069-7777777', '0176-77777777', 'peter@ecosolutions.de', 5, 5, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ort`
--

DROP TABLE IF EXISTS `ort`;
CREATE TABLE `ort` (
  `PK_Ort` int(11) NOT NULL,
  `Stadt` varchar(255) DEFAULT NULL,
  `PLZ` varchar(10) DEFAULT NULL,
  `Straße` varchar(255) DEFAULT NULL,
  `Hausnummer` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ort`
--

INSERT INTO `ort` (`PK_Ort`, `Stadt`, `PLZ`, `Straße`, `Hausnummer`) VALUES
(1, 'Berlin', '10115', 'Hauptstraße', '10'),
(2, 'Hamburg', '20095', 'Nebenstraße', '5'),
(3, 'München', '80331', 'Platz', '12'),
(4, 'Köln', '50667', 'Ring', '3'),
(5, 'Frankfurt', '60313', 'Weg', '8');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `priorität`
--

DROP TABLE IF EXISTS `priorität`;
CREATE TABLE `priorität` (
  `Prioritätsname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Priorität` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `priorität`
--

INSERT INTO `priorität` (`Prioritätsname`, `Beschreibung`, `PK_Priorität`) VALUES
('Hoch', 'Wichtige Aufgabe', 1),
('Mittel', 'Mittelwichtige Aufgabe', 2),
('Niedrig', 'Geringe Priorität', 3),
('Sehr Hoch', 'Sehr dringende Aufgabe', 4),
('Gering', 'Kann warten', 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnung`
--

DROP TABLE IF EXISTS `rechnung`;
CREATE TABLE `rechnung` (
  `Rechnungsnr` varchar(255) NOT NULL,
  `Ticketbeschreibung` text DEFAULT NULL,
  `Abrechnung` varchar(255) DEFAULT NULL,
  `Ratenzahlung` tinyint(1) DEFAULT NULL,
  `FK_Bezahlungsart` int(11) DEFAULT NULL,
  `FK_Kunde` int(11) DEFAULT NULL,
  `FK_Ticket` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rechnung`
--

INSERT INTO `rechnung` (`Rechnungsnr`, `Ticketbeschreibung`, `Abrechnung`, `Ratenzahlung`, `FK_Bezahlungsart`, `FK_Kunde`, `FK_Ticket`) VALUES
('R001', 'Problem mit Server', 'Rechnung für Ticket 1', 0, 1, 1, 1),
('R002', 'Fehler in Software', 'Rechnung für Ticket 2', 0, 2, 2, 2),
('R003', 'Installation eines Netzwerks', 'Rechnung für Ticket 3', 1, 3, 3, 3),
('R004', 'Hardwaredefekt', 'Rechnung für Ticket 4', 0, 4, 4, 4),
('R005', 'Beratung zu IT-Sicherheit', 'Rechnung für Ticket 5', 1, 5, 5, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechtegruppe`
--

DROP TABLE IF EXISTS `rechtegruppe`;
CREATE TABLE `rechtegruppe` (
  `Administrationsrechte` tinyint(1) DEFAULT NULL,
  `Bestelllimit` decimal(10,2) DEFAULT NULL,
  `Helpdesk_Fernwartung` tinyint(1) DEFAULT NULL,
  `PK_Rechtegruppe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rechtegruppe`
--

INSERT INTO `rechtegruppe` (`Administrationsrechte`, `Bestelllimit`, `Helpdesk_Fernwartung`, `PK_Rechtegruppe`) VALUES
(1, 1000.00, 1, 1),
(0, 500.00, 0, 2),
(1, 2000.00, 1, 3),
(0, 100.00, 0, 4),
(1, 1500.00, 1, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `residiert`
--

DROP TABLE IF EXISTS `residiert`;
CREATE TABLE `residiert` (
  `FK_Kunde` int(11) NOT NULL,
  `FK_Ort` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `residiert`
--

INSERT INTO `residiert` (`FK_Kunde`, `FK_Ort`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `PK_Status` int(11) NOT NULL,
  `Statusname` varchar(255) DEFAULT NULL,
  `Farbe` varchar(20) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `status`
--

INSERT INTO `status` (`PK_Status`, `Statusname`, `Farbe`, `Beschreibung`) VALUES
(1, 'Offen', 'Rot', 'Ticket ist offen'),
(2, 'In Bearbeitung', 'Gelb', 'Ticket in Bearbeitung'),
(3, 'Geschlossen', 'Grün', 'Ticket geschlossen'),
(4, 'Wartend', 'Blau', 'Wartet auf Antwort'),
(5, 'Archiviert', 'Grau', 'Ticket archiviert');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
  `PK_Ticket` int(11) NOT NULL,
  `Ticket_Titel` varchar(75) NOT NULL,
  `Beschreibung` text DEFAULT NULL,
  `Interne_Notiz` text DEFAULT NULL,
  `Interner_Status` text DEFAULT NULL,
  `Erstelldatum` date DEFAULT NULL,
  `Bearbeitungsdatum` date DEFAULT NULL,
  `FK_Status` int(11) DEFAULT NULL,
  `FK_Priorität` int(11) DEFAULT NULL,
  `FK_Art` int(11) DEFAULT NULL,
  `FK_Mitarbeiter` int(11) DEFAULT NULL,
  `FK_Kunde` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ticket`
--

INSERT INTO `ticket` (`PK_Ticket`, `Ticket_Titel`, `Beschreibung`, `Interne_Notiz`, `Interner_Status`, `Erstelldatum`, `Bearbeitungsdatum`, `FK_Status`, `FK_Priorität`, `FK_Art`, `FK_Mitarbeiter`, `FK_Kunde`) VALUES
(1, 'Problem mit Server', 'Server läuft nicht richtig', 'Keine Notiz', 'Offen', '2024-09-01', '2024-09-02', 1, 1, 1, 1, 1),
(2, 'Fehler in Software', 'Software gibt Fehler aus', 'Dringend', 'In Bearbeitung', '2024-09-02', '2024-09-03', 2, 2, 2, 2, 2),
(3, 'Netzwerkinstallation', 'Neues Netzwerk muss installiert werden', 'Kabel fehlen', 'Geschlossen', '2024-09-03', '2024-09-04', 3, 3, 3, 3, 3),
(4, 'Hardwaredefekt', 'Hardwareproblem an PC', 'Ersatzteil bestellt', 'Wartend', '2024-09-04', '2024-09-05', 4, 4, 4, 4, 4),
(5, 'IT-Sicherheitsberatung', 'Beratung zum Thema Sicherheit', 'Eingeschränkte Verfügbarkeit', 'Archiviert', '2024-09-05', '2024-09-06', 5, 5, 5, 5, 5);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `abgeleitet`
--
ALTER TABLE `abgeleitet`
  ADD PRIMARY KEY (`FK_Dienstleistung`,`FK_Ticket`),
  ADD KEY `abgeleitet_fk_2` (`FK_Ticket`);

--
-- Indizes für die Tabelle `art`
--
ALTER TABLE `art`
  ADD PRIMARY KEY (`PK_Art`);

--
-- Indizes für die Tabelle `bearbeitet`
--
ALTER TABLE `bearbeitet`
  ADD PRIMARY KEY (`FK_Mitarbeiter`,`FK_Ticket`),
  ADD KEY `bearbeitet_fk_2` (`FK_Ticket`);

--
-- Indizes für die Tabelle `bezahlungsart`
--
ALTER TABLE `bezahlungsart`
  ADD PRIMARY KEY (`PK_Bezahlungsart`);

--
-- Indizes für die Tabelle `dienstleistung`
--
ALTER TABLE `dienstleistung`
  ADD PRIMARY KEY (`PK_Dienstleistung`);

--
-- Indizes für die Tabelle `eigene_firma`
--
ALTER TABLE `eigene_firma`
  ADD PRIMARY KEY (`PK_EigeneFirma`);

--
-- Indizes für die Tabelle `intern_residiert`
--
ALTER TABLE `intern_residiert`
  ADD PRIMARY KEY (`FK_Ort`,`FK_EigeneFirma`),
  ADD KEY `FK_EigeneFirma` (`FK_EigeneFirma`);

--
-- Indizes für die Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD PRIMARY KEY (`PK_Kunde`);

--
-- Indizes für die Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  ADD PRIMARY KEY (`PK_Mitarbeiter`),
  ADD KEY `mitarbeiter_fk_1` (`FK_Ort`),
  ADD KEY `mitarbeiter_fk_2` (`FK_Rechtegruppe`),
  ADD KEY `mitarbeiter_fk_3` (`FK_EigeneFirma`);

--
-- Indizes für die Tabelle `ort`
--
ALTER TABLE `ort`
  ADD PRIMARY KEY (`PK_Ort`);

--
-- Indizes für die Tabelle `priorität`
--
ALTER TABLE `priorität`
  ADD PRIMARY KEY (`PK_Priorität`);

--
-- Indizes für die Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD PRIMARY KEY (`Rechnungsnr`),
  ADD KEY `rechnung_fk_1` (`FK_Bezahlungsart`),
  ADD KEY `rechnung_fk_2` (`FK_Kunde`),
  ADD KEY `rechnung_fk_3` (`FK_Ticket`);

--
-- Indizes für die Tabelle `rechtegruppe`
--
ALTER TABLE `rechtegruppe`
  ADD PRIMARY KEY (`PK_Rechtegruppe`);

--
-- Indizes für die Tabelle `residiert`
--
ALTER TABLE `residiert`
  ADD PRIMARY KEY (`FK_Kunde`,`FK_Ort`) USING BTREE,
  ADD KEY `residiert_fk_2` (`FK_Kunde`),
  ADD KEY `residiert` (`FK_Ort`);

--
-- Indizes für die Tabelle `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`PK_Status`);

--
-- Indizes für die Tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`PK_Ticket`),
  ADD KEY `ticket_fk_1` (`FK_Status`),
  ADD KEY `ticket_fk_2` (`FK_Priorität`),
  ADD KEY `ticket_fk_3` (`FK_Art`),
  ADD KEY `ticket_fk_4` (`FK_Mitarbeiter`),
  ADD KEY `ticket_fk_5` (`FK_Kunde`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `art`
--
ALTER TABLE `art`
  MODIFY `PK_Art` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `bezahlungsart`
--
ALTER TABLE `bezahlungsart`
  MODIFY `PK_Bezahlungsart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `dienstleistung`
--
ALTER TABLE `dienstleistung`
  MODIFY `PK_Dienstleistung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `eigene_firma`
--
ALTER TABLE `eigene_firma`
  MODIFY `PK_EigeneFirma` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `kunde`
--
ALTER TABLE `kunde`
  MODIFY `PK_Kunde` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  MODIFY `PK_Mitarbeiter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `ort`
--
ALTER TABLE `ort`
  MODIFY `PK_Ort` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `priorität`
--
ALTER TABLE `priorität`
  MODIFY `PK_Priorität` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `rechtegruppe`
--
ALTER TABLE `rechtegruppe`
  MODIFY `PK_Rechtegruppe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `status`
--
ALTER TABLE `status`
  MODIFY `PK_Status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `ticket`
--
ALTER TABLE `ticket`
  MODIFY `PK_Ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `abgeleitet`
--
ALTER TABLE `abgeleitet`
  ADD CONSTRAINT `abgeleitet_fk_1` FOREIGN KEY (`FK_Dienstleistung`) REFERENCES `dienstleistung` (`PK_Dienstleistung`),
  ADD CONSTRAINT `abgeleitet_fk_2` FOREIGN KEY (`FK_Ticket`) REFERENCES `ticket` (`PK_Ticket`);

--
-- Constraints der Tabelle `bearbeitet`
--
ALTER TABLE `bearbeitet`
  ADD CONSTRAINT `bearbeitet_fk_1` FOREIGN KEY (`FK_Mitarbeiter`) REFERENCES `mitarbeiter` (`PK_Mitarbeiter`),
  ADD CONSTRAINT `bearbeitet_fk_2` FOREIGN KEY (`FK_Ticket`) REFERENCES `ticket` (`PK_Ticket`);

--
-- Constraints der Tabelle `intern_residiert`
--
ALTER TABLE `intern_residiert`
  ADD CONSTRAINT `intern_residiert_ibfk_1` FOREIGN KEY (`FK_Ort`) REFERENCES `ort` (`PK_Ort`),
  ADD CONSTRAINT `intern_residiert_ibfk_2` FOREIGN KEY (`FK_EigeneFirma`) REFERENCES `eigene_firma` (`PK_EigeneFirma`);

--
-- Constraints der Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  ADD CONSTRAINT `mitarbeiter_fk_1` FOREIGN KEY (`FK_Ort`) REFERENCES `ort` (`PK_Ort`),
  ADD CONSTRAINT `mitarbeiter_fk_2` FOREIGN KEY (`FK_Rechtegruppe`) REFERENCES `rechtegruppe` (`PK_Rechtegruppe`),
  ADD CONSTRAINT `mitarbeiter_fk_3` FOREIGN KEY (`FK_EigeneFirma`) REFERENCES `eigene_firma` (`PK_EigeneFirma`);

--
-- Constraints der Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD CONSTRAINT `rechnung_fk_1` FOREIGN KEY (`FK_Bezahlungsart`) REFERENCES `bezahlungsart` (`PK_Bezahlungsart`),
  ADD CONSTRAINT `rechnung_fk_2` FOREIGN KEY (`FK_Kunde`) REFERENCES `kunde` (`PK_Kunde`),
  ADD CONSTRAINT `rechnung_fk_3` FOREIGN KEY (`FK_Ticket`) REFERENCES `ticket` (`PK_Ticket`);

--
-- Constraints der Tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_fk_1` FOREIGN KEY (`FK_Status`) REFERENCES `status` (`PK_Status`),
  ADD CONSTRAINT `ticket_fk_2` FOREIGN KEY (`FK_Priorität`) REFERENCES `priorität` (`PK_Priorität`),
  ADD CONSTRAINT `ticket_fk_3` FOREIGN KEY (`FK_Art`) REFERENCES `art` (`PK_Art`),
  ADD CONSTRAINT `ticket_fk_4` FOREIGN KEY (`FK_Mitarbeiter`) REFERENCES `mitarbeiter` (`PK_Mitarbeiter`),
  ADD CONSTRAINT `ticket_fk_5` FOREIGN KEY (`FK_Kunde`) REFERENCES `kunde` (`PK_Kunde`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
