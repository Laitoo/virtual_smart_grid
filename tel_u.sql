-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Jul 2025 pada 13.51
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tel_u`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `monitoring32122_20250725`
--

CREATE TABLE `monitoring32122_20250725` (
  `id` int(11) NOT NULL,
  `_terminalTime` varchar(100) NOT NULL,
  `heater` int(11) DEFAULT 0,
  `fan` int(11) DEFAULT 0,
  `fanstep` int(11) DEFAULT 0,
  `dimmer` int(11) DEFAULT 0,
  `pv_lux` int(11) DEFAULT 0,
  `voltage` int(11) DEFAULT 0,
  `current` int(11) DEFAULT 0,
  `temperature` int(11) DEFAULT 0,
  `humidity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `offgrid_20250504`
--

CREATE TABLE `offgrid_20250504` (
  `id` int(11) NOT NULL,
  `_terminalTime` varchar(100) NOT NULL,
  `batteryVoltage` int(11) DEFAULT 0,
  `batteryCurrent` int(11) DEFAULT 0,
  `batteryCondition` int(11) DEFAULT 0,
  `sccVoltage` int(11) DEFAULT 0,
  `sccCurrent` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ongrid_20250504`
--

CREATE TABLE `ongrid_20250504` (
  `id` int(11) NOT NULL,
  `_terminalTime` varchar(100) NOT NULL,
  `dcVoltage` int(11) DEFAULT 0,
  `dcCurrent` int(11) DEFAULT 0,
  `acCurrent` int(11) DEFAULT 0,
  `acVoltage` int(11) DEFAULT 0,
  `pvPower` int(11) DEFAULT 0,
  `acFrequency` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pv_20250504`
--

CREATE TABLE `pv_20250504` (
  `id` int(11) NOT NULL,
  `_terminalTime` varchar(100) NOT NULL,
  `sprayer` int(11) DEFAULT 0,
  `heater` int(11) DEFAULT 0,
  `lightIntensity` int(11) DEFAULT 0,
  `fanStep` int(11) DEFAULT 0,
  `fanSpeed` int(11) DEFAULT 0,
  `irradiance` int(11) DEFAULT 0,
  `windSpeed` int(11) DEFAULT 0,
  `voltage` int(11) DEFAULT 0,
  `current` int(11) DEFAULT 0,
  `tiltAngle` int(11) DEFAULT 0,
  `tiltServo` int(11) DEFAULT 0,
  `temperature` int(11) DEFAULT 0,
  `humidity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `role` enum('root','admin','dosen','asisten','praktikan','plts','pltmh','pltb') DEFAULT 'praktikan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `refresh_token`, `role`) VALUES
(1, 'admin', '$2b$10$5UVmLYiDR3DCAeVL13VxOuT.b1.giGf/2MQWnKqmhGcOCJrbPUOCO', '', 'admin'),
(2, 'dosen', '$2b$10$5UVmLYiDR3DCAeVL13VxOuT.b1.giGf/2MQWnKqmhGcOCJrbPUOCO', '', 'dosen'),
(3, 'asisten', '$2b$10$5UVmLYiDR3DCAeVL13VxOuT.b1.giGf/2MQWnKqmhGcOCJrbPUOCO', '', 'asisten'),
(5, 'userplts', '$2b$10$5UVmLYiDR3DCAeVL13VxOuT.b1.giGf/2MQWnKqmhGcOCJrbPUOCO', '', 'plts'),
(8, 'bagus', '$2b$05$J8TpTKxCcrTySI8JGcjr0eKnbimFjOwPoQ2YMhR2XwWvGrFJ7PJxa', '', 'dosen'),
(10, 'chiko', '$2b$10$rr/KQ1tJK3VP4wVJHrCdWuwxgVrfWmgEIJoEvdPLajgaMP9l0IPfq', '', 'admin'),
(11, 'Userpltmh', '$2b$10$rr/KQ1tJK3VP4wVJHrCdWuwxgVrfWmgEIJoEvdPLajgaMP9l0IPfq', '', 'pltmh'),
(12, 'Userpltb', '$2b$10$rr/KQ1tJK3VP4wVJHrCdWuwxgVrfWmgEIJoEvdPLajgaMP9l0IPfq', '', 'pltb');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `monitoring32122_20250725`
--
ALTER TABLE `monitoring32122_20250725`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `offgrid_20250504`
--
ALTER TABLE `offgrid_20250504`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ongrid_20250504`
--
ALTER TABLE `ongrid_20250504`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pv_20250504`
--
ALTER TABLE `pv_20250504`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `monitoring32122_20250725`
--
ALTER TABLE `monitoring32122_20250725`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `offgrid_20250504`
--
ALTER TABLE `offgrid_20250504`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `ongrid_20250504`
--
ALTER TABLE `ongrid_20250504`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pv_20250504`
--
ALTER TABLE `pv_20250504`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
