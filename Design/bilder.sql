-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 16 jan 2017 kl 08:55
-- Serverversion: 5.7.14
-- PHP-version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `timje_se`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `bilder`
--

CREATE TABLE `bilder` (
  `ID` int(11) NOT NULL,
  `TITEL` text NOT NULL,
  `TEXT` text,
  `DISPLAY_IMG` text NOT NULL,
  `THUMB_IMG` text NOT NULL,
  `UPLOAD_TIME` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `bilder`
--

INSERT INTO `bilder` (`ID`, `TITEL`, `TEXT`, `DISPLAY_IMG`, `THUMB_IMG`, `UPLOAD_TIME`) VALUES
(1, 'Azores', 'Easter 2010 me and my two sons went to  SÃ£o Miguel, Azores for a week.', 'IMG_5909.jpg', 'thumbnails_IMG_5909.jpg', NULL),
(2, 'Ponta Delgada', NULL, 'IMG_5293.jpg', 'thumbnails_IMG_5293.jpg', NULL),
(3, 'Nice House', 'A beautiful house in Ponta Delgada. A place I would like to have as my.', 'IMG_5309.jpg', 'thumbnails_IMG_5309.jpg', NULL),
(4, 'Less nice building', NULL, 'IMG_5239.jpg', 'thumbnails_IMG_5239.jpg', NULL),
(6, 'Locally produced', 'A market square with plenty of fine fruit and vegetables etc.', 'IMG_5330.jpg', 'thumbnails_IMG_5330.jpg', NULL),
(5, 'Skyline', 'From the new pier you can see that Ponta Delgade is a town that seems to expand.', 'IMG_5357.jpg', 'thumbnails_IMG_5357.jpg', NULL);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `bilder`
--
ALTER TABLE `bilder`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `bilder`
--
ALTER TABLE `bilder`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
