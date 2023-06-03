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
-- Datenbank: `authjs`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `apps`
--

CREATE TABLE `apps` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `jwt-at-secret` text DEFAULT NULL,
  `jwt-rt-secret` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `apps`
--

INSERT INTO `apps` (`id`, `name`, `ip`, `jwt-at-secret`, `jwt-rt-secret`) VALUES
(1, 'app1', '192.168.178.32', 'b02a4675f9558e1a3d1e1475244a659e6aad7a423601b6e1b2a50650a1187fb5ab5403c5a1b6d99008eaadfaf3edb7d90ddf8117808674dd11b74e56fe97e808', 'd558cebbeac0de197b87a0886af696285e963eb10656e2a078b6fe218c94555ce16cda623fddf221879cb5bc682b183f3c65328c643b297d329fcdcabf6e6896');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `refresh-tokens`
--

CREATE TABLE `refresh-tokens` (
  `id` int(11) NOT NULL,
  `rt` text NOT NULL,
  `app` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `refresh-tokens`
--

INSERT INTO `refresh-tokens` (`id`, `rt`, `app`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGV2IiwiaWF0IjoxNjg1ODEzMjkyfQ.fChEVuiNeXt9NKpLjwqiE6DVFmrjFH0YcVBkofm5gH0', 1),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGV2IiwiaWF0IjoxNjg1ODEzMzQ2fQ.E6yFY3AyPn6_ezTBVF-zPm95QJJfgcyySEhyRFr5AgM', 1);

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users-apps`
--

CREATE TABLE `users-apps` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `app` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users-apps`
--

INSERT INTO `users-apps` (`id`, `user`, `app`) VALUES
(1, 1, 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `refresh-tokens`
--
ALTER TABLE `refresh-tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app` (`app`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users-apps`
--
ALTER TABLE `users-apps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `app` (`app`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `refresh-tokens`
--
ALTER TABLE `refresh-tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `users-apps`
--
ALTER TABLE `users-apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `refresh-tokens`
--
ALTER TABLE `refresh-tokens`
  ADD CONSTRAINT `refresh-tokens_ibfk_1` FOREIGN KEY (`app`) REFERENCES `apps` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `users-apps`
--
ALTER TABLE `users-apps`
  ADD CONSTRAINT `users-apps_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users-apps_ibfk_2` FOREIGN KEY (`app`) REFERENCES `apps` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
