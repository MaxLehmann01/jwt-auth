-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Jun 2023 um 19:48
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appjs`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `customers`
--

CREATE TABLE `customers` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postalZip` varchar(10) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `list` varchar(255) DEFAULT NULL,
  `alphanumeric` varchar(255) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `numberrange` mediumint(9) DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `email`, `address`, `postalZip`, `region`, `country`, `list`, `alphanumeric`, `currency`, `numberrange`, `text`) VALUES
(1, 'Kevin Young', '(234) 198-6154', 'ante@hotmail.org', 'Ap #560-6073 Quis Rd.', '97982', 'South Island', 'South Africa', '7', 'GLE43SFY0LR', '$41.23', 2, 'lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis'),
(2, 'Destiny French', '(178) 538-8626', 'phasellus.elit.pede@icloud.org', '326-2458 Dapibus Street', '399821', 'Lower Austria', 'Canada', '17', 'DYX77VPN6DE', '$41.55', 1, 'lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu,'),
(3, 'Steel Puckett', '1-678-287-4378', 'hendrerit@icloud.org', 'Ap #190-9850 Ultrices Road', 'FH9G 9DQ', 'Antwerpen', 'New Zealand', '1', 'SKE97DQE0EL', '$88.48', 6, 'aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae'),
(4, 'Xenos Neal', '(608) 809-2534', 'mauris@outlook.edu', 'Ap #943-6521 Taciti Street', '9540', 'Veracruz', 'United Kingdom', '13', 'JYC68EVT2VR', '$3.65', 8, 'Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies'),
(5, 'Aspen Briggs', '(324) 220-5213', 'turpis@aol.couk', 'P.O. Box 569, 789 Est. Avenue', '978527', 'North Island', 'Germany', '13', 'OJW75MJH3WG', '$7.97', 0, 'dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `displayname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `name`, `displayname`) VALUES
(1, 'dev', 'Development');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `customers`
--
ALTER TABLE `customers`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
