-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Sep 2024 um 13:54
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
(3, 3, 75.00);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `art`
--

CREATE TABLE `art` (
  `Artname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Art` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `art`
--

INSERT INTO `art` (`Artname`, `Beschreibung`, `PK_Art`) VALUES
('Wartung', 'Regelmäßige Wartung', 1),
('Fehlerbehebung', 'Behebung von Softwarefehlern', 2),
('Installation', 'Installation neuer Hardware oder Software', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bearbeitet`
--

CREATE TABLE `bearbeitet` (
  `FK_Mitarbeiter` int(11) NOT NULL,
  `FK_Ticket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bezahlungsart`
--

CREATE TABLE `bezahlungsart` (
  `Bezahlungsartname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Bezahlungsart` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `bezahlungsart`
--

INSERT INTO `bezahlungsart` (`Bezahlungsartname`, `Beschreibung`, `PK_Bezahlungsart`) VALUES
('Kreditkarte', 'Zahlung per Kreditkarte', 1),
('Überweisung', 'Banküberweisung', 2),
('Überweisung', 'Zahlung per Überweisung', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dienstleistung`
--

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
(3, 'Netzwerkinstallation', 75.00);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `eigene firma`
--

CREATE TABLE `eigene firma` (
  `PK_EigeneFirma` int(255) NOT NULL,
  `Firmenename` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kunde_firma`
--

CREATE TABLE `kunde_firma` (
  `Kundennr` varchar(255) DEFAULT NULL,
  `Firmenname` varchar(255) DEFAULT NULL,
  `PK_Kunde` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `kunde_firma`
--

INSERT INTO `kunde_firma` (`Kundennr`, `Firmenname`, `PK_Kunde`) VALUES
('K001', 'Firma Alpha', 1),
('K002', 'Firma Beta', 2),
('K003', 'Firma Gamma', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitarbeiter`
--

CREATE TABLE `mitarbeiter` (
  `PK_Mitarbeiter` int(11) NOT NULL,
  `Vorname` varchar(255) DEFAULT NULL,
  `Nachname` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL,
  `Tel` varchar(20) DEFAULT NULL,
  `Mobil` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `FK_Ort` int(11) DEFAULT NULL,
  `FK_Rechtegruppe` int(11) DEFAULT NULL,
  `FK_Firma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `mitarbeiter`
--

INSERT INTO `mitarbeiter` (`PK_Mitarbeiter`, `Vorname`, `Nachname`, `Position`, `Tel`, `Mobil`, `Email`, `FK_Ort`, `FK_Rechtegruppe`, `FK_Firma`) VALUES
(1, 'Max', 'Mustermann', 'Techniker', '01234-567890', '0171-2345678', 'max@firma.de', 1, 1, 1),
(2, 'Erika', 'Musterfrau', 'Sekretärin', '01234-567891', '0171-2345679', 'erika@firma.de', 2, 2, 2),
(3, 'Hans', 'Müller', 'Entwickler', '030555555', '01766554433', 'hans.mueller@example.com', 3, 1, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ort`
--

CREATE TABLE `ort` (
  `Stadt` varchar(255) DEFAULT NULL,
  `PLZ` varchar(10) DEFAULT NULL,
  `Straße` varchar(255) DEFAULT NULL,
  `Hausnr` varchar(10) DEFAULT NULL,
  `PK_Ort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ort`
--

INSERT INTO `ort` (`Stadt`, `PLZ`, `Straße`, `Hausnr`, `PK_Ort`) VALUES
('Stadt A', '12345', 'Hauptstraße', '10', 1),
('Stadt B', '23456', 'Nebenstraße', '20', 2),
('Stadt C', '34567', 'Dorfstraße', '30', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `priorität`
--

CREATE TABLE `priorität` (
  `Prioritätsname` varchar(255) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Priorität` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `priorität`
--

INSERT INTO `priorität` (`Prioritätsname`, `Beschreibung`, `PK_Priorität`) VALUES
('Hoch', 'Hohe Priorität', 1),
('Mittel', 'Mittlere Priorität', 2),
('Niedrig', 'Geringe Priorität', 3),
('Hoch', 'Hohe Priorität', 4),
('Mittel', 'Mittlere Priorität', 5),
('Niedrig', 'Geringe Priorität', 6);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechnung`
--

CREATE TABLE `rechnung` (
  `Rechnungsnr` varchar(255) NOT NULL,
  `Abrechnung` varchar(255) DEFAULT NULL,
  `FK_Bezahlungsart` int(11) DEFAULT NULL,
  `FK_Kunde` int(11) DEFAULT NULL,
  `FK_Ticket` int(11) DEFAULT NULL,
  `Ticketbeschreibung` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rechnung`
--

INSERT INTO `rechnung` (`Rechnungsnr`, `Abrechnung`, `FK_Bezahlungsart`, `FK_Kunde`, `FK_Ticket`, `Ticketbeschreibung`) VALUES
('R001', 'Rechnung für Ticket 1', 1, 1, 1, 'Serverwartung'),
('R002', 'Rechnung für Ticket 2', 2, 2, 2, 'Softwareinstallation'),
('R003', 'Rechnung für Ticket 3', 3, 3, 3, 'Netzwerkinstallation');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rechtegruppe`
--

CREATE TABLE `rechtegruppe` (
  `Adminrechte` tinyint(1) DEFAULT NULL,
  `Bestelllimit` decimal(10,2) DEFAULT NULL,
  `Helpdesk_Fernwartung` tinyint(1) DEFAULT NULL,
  `PK_Rechtegruppe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rechtegruppe`
--

INSERT INTO `rechtegruppe` (`Adminrechte`, `Bestelllimit`, `Helpdesk_Fernwartung`, `PK_Rechtegruppe`) VALUES
(1, 1000.00, 1, 1),
(0, 500.00, 0, 2),
(1, 2000.00, 1, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `residiert`
--

CREATE TABLE `residiert` (
  `FK_Firma` int(11) NOT NULL,
  `FK_Kunde` int(11) NOT NULL,
  `FK_Ort` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `residiert`
--

INSERT INTO `residiert` (`FK_Firma`, `FK_Kunde`, `FK_Ort`) VALUES
(1, 1, 0),
(2, 2, 0),
(3, 3, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status`
--

CREATE TABLE `status` (
  `Statusname` varchar(255) DEFAULT NULL,
  `Farbe` varchar(20) DEFAULT NULL,
  `Beschreibung` text DEFAULT NULL,
  `PK_Status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `status`
--

INSERT INTO `status` (`Statusname`, `Farbe`, `Beschreibung`, `PK_Status`) VALUES
('Offen', 'Rot', 'Ticket ist offen', 1),
('In Bearbeitung', 'Gelb', 'Ticket wird bearbeitet', 2),
('Geschlossen', 'Grün', 'Ticket ist geschlossen', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ticket`
--

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
  `FK_erstersteller` int(11) DEFAULT NULL,
  `FK_Kunde` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ticket`
--

INSERT INTO `ticket` (`PK_Ticket`, `Ticket_Titel`, `Beschreibung`, `Interne_Notiz`, `Interner_Status`, `Erstelldatum`, `Bearbeitungsdatum`, `FK_Status`, `FK_Priorität`, `FK_Art`, `FK_erstersteller`, `FK_Kunde`) VALUES
(1, '', 'Serverausfall', 'Dringende Wartung erforderlich', 'Offen', '2024-09-01', '2024-09-02', 1, 1, 1, 1, 1),
(2, '', 'Softwarefehler', 'Benötigt schnelle Unterstützung', 'In Bearbeitung', '2024-09-03', '2024-09-04', 2, 2, 2, 2, 2),
(3, '', 'Netzwerkprobleme', 'Kundenbericht: Verbindungsprobleme', 'Geschlossen', '2024-09-05', '2024-09-06', 3, 3, 3, 3, 3),
(4, '', 'Testticket', 'Testnotiz', 'Offen', '2024-09-10', '2024-09-11', 1, 1, 1, 1, 1);

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
-- Indizes für die Tabelle `eigene firma`
--
ALTER TABLE `eigene firma`
  ADD PRIMARY KEY (`PK_EigeneFirma`);

--
-- Indizes für die Tabelle `kunde_firma`
--
ALTER TABLE `kunde_firma`
  ADD PRIMARY KEY (`PK_Kunde`);

--
-- Indizes für die Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  ADD PRIMARY KEY (`PK_Mitarbeiter`),
  ADD KEY `mitarbeiter_fk_1` (`FK_Ort`),
  ADD KEY `mitarbeiter_fk_2` (`FK_Rechtegruppe`),
  ADD KEY `mitarbeiter_fk_3` (`FK_Firma`);

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
  ADD PRIMARY KEY (`FK_Firma`,`FK_Kunde`),
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
  ADD KEY `ticket_fk_4` (`FK_erstersteller`),
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
  MODIFY `PK_Bezahlungsart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `dienstleistung`
--
ALTER TABLE `dienstleistung`
  MODIFY `PK_Dienstleistung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `eigene firma`
--
ALTER TABLE `eigene firma`
  MODIFY `PK_EigeneFirma` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `kunde_firma`
--
ALTER TABLE `kunde_firma`
  MODIFY `PK_Kunde` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  MODIFY `PK_Mitarbeiter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `ort`
--
ALTER TABLE `ort`
  MODIFY `PK_Ort` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `priorität`
--
ALTER TABLE `priorität`
  MODIFY `PK_Priorität` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `rechtegruppe`
--
ALTER TABLE `rechtegruppe`
  MODIFY `PK_Rechtegruppe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `status`
--
ALTER TABLE `status`
  MODIFY `PK_Status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `ticket`
--
ALTER TABLE `ticket`
  MODIFY `PK_Ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Constraints der Tabelle `mitarbeiter`
--
ALTER TABLE `mitarbeiter`
  ADD CONSTRAINT `mitarbeiter_fk_1` FOREIGN KEY (`FK_Ort`) REFERENCES `ort` (`PK_Ort`),
  ADD CONSTRAINT `mitarbeiter_fk_2` FOREIGN KEY (`FK_Rechtegruppe`) REFERENCES `rechtegruppe` (`PK_Rechtegruppe`),
  ADD CONSTRAINT `mitarbeiter_fk_3` FOREIGN KEY (`FK_Firma`) REFERENCES `kunde_firma` (`PK_Kunde`);

--
-- Constraints der Tabelle `rechnung`
--
ALTER TABLE `rechnung`
  ADD CONSTRAINT `rechnung_fk_1` FOREIGN KEY (`FK_Bezahlungsart`) REFERENCES `bezahlungsart` (`PK_Bezahlungsart`),
  ADD CONSTRAINT `rechnung_fk_2` FOREIGN KEY (`FK_Kunde`) REFERENCES `kunde_firma` (`PK_Kunde`),
  ADD CONSTRAINT `rechnung_fk_3` FOREIGN KEY (`FK_Ticket`) REFERENCES `ticket` (`PK_Ticket`);

--
-- Constraints der Tabelle `residiert`
--
ALTER TABLE `residiert`
  ADD CONSTRAINT `residiert` FOREIGN KEY (`FK_Ort`) REFERENCES `ort` (`PK_Ort`),
  ADD CONSTRAINT `residiert_fk_1` FOREIGN KEY (`FK_Firma`) REFERENCES `kunde_firma` (`PK_Kunde`),
  ADD CONSTRAINT `residiert_fk_2` FOREIGN KEY (`FK_Kunde`) REFERENCES `kunde_firma` (`PK_Kunde`);

--
-- Constraints der Tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_fk_1` FOREIGN KEY (`FK_Status`) REFERENCES `status` (`PK_Status`),
  ADD CONSTRAINT `ticket_fk_2` FOREIGN KEY (`FK_Priorität`) REFERENCES `priorität` (`PK_Priorität`),
  ADD CONSTRAINT `ticket_fk_3` FOREIGN KEY (`FK_Art`) REFERENCES `art` (`PK_Art`),
  ADD CONSTRAINT `ticket_fk_4` FOREIGN KEY (`FK_erstersteller`) REFERENCES `mitarbeiter` (`PK_Mitarbeiter`),
  ADD CONSTRAINT `ticket_fk_5` FOREIGN KEY (`FK_Kunde`) REFERENCES `kunde_firma` (`PK_Kunde`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
