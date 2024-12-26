-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- SO do servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- A despejar estrutura da base de dados para teste_bank
DROP DATABASE IF EXISTS `teste_bank`;
CREATE DATABASE IF NOT EXISTS `teste_bank` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teste_bank`;

-- A despejar estrutura para tabela teste_bank.conta
DROP TABLE IF EXISTS `conta`;
CREATE TABLE IF NOT EXISTS `conta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('poupança','prazo') NOT NULL,
  `saldo` decimal(15,2) NOT NULL,
  `userId` int DEFAULT NULL,
  `numero_conta` varchar(255) NOT NULL,
  `IBAN` varchar(255) NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_7c5dfef4ff5d5d033307949703` (`numero_conta`),
  UNIQUE KEY `IDX_0c934110fe5f975ccce9d537d0` (`IBAN`),
  KEY `FK_f707d9f22cad1b8a0edd8c49ce3` (`userId`),
  CONSTRAINT `FK_f707d9f22cad1b8a0edd8c49ce3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.conta: ~7 rows (aproximadamente)
INSERT INTO `conta` (`id`, `tipo`, `saldo`, `userId`, `numero_conta`, `IBAN`, `active`) VALUES
	(1, 'prazo', 5000.00, 13, '445566632', '447755588', 1),
	(2, 'prazo', 16600.08, 14, '0445566633', 'AO0000000000000447755589', 0),
	(10, 'poupança', 199500.00, 1, '12202412230445566633', 'AO00001212202412230445566633', 1),
	(17, 'prazo', 3000.12, 9, '1220241223', 'AO0000121220241223', 1),
	(21, 'prazo', 7500.00, 10, '1220241223153810', 'AO0000121220241223153810', 1),
	(22, 'prazo', 1000.00, 12, '1220241223153839', 'AO0000121220241223153839', 1),
	(23, 'prazo', 1000.00, 22, '1220241224230006', 'AO0000121220241224230006', 1);

-- A despejar estrutura para tabela teste_bank.historicos
DROP TABLE IF EXISTS `historicos`;
CREATE TABLE IF NOT EXISTS `historicos` (
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.historicos: ~0 rows (aproximadamente)
INSERT INTO `historicos` (`created_at`, `update_at`, `id`, `descricao`) VALUES
	('2024-12-24 21:00:00', '2024-12-24 21:00:00', 1, 'Movimentação do tipo deposito realizada na conta ID 12202412230445566633 com valor 1000'),
	('2024-12-24 21:16:49', '2024-12-24 21:16:49', 2, 'Movimentação do tipo deposito realizada na conta ID 12202412230445566633 com valor 1000'),
	('2024-12-24 21:38:13', '2024-12-24 21:38:13', 3, 'Movimentação do tipo levantamento realizada na conta ID 445566632 com valor 1500. Cliente Damião Vicente Paulo,atendido por  '),
	('2024-12-24 21:38:13', '2024-12-24 21:38:13', 4, 'Movimentação do tipo transferencia realizada na conta ID 1220241223153810 com valor 1500. Cliente Saul Raul da Silva,atendido por  '),
	('2024-12-24 22:00:06', '2024-12-24 22:00:06', 5, 'Conta bancária do tipo prazo criada com Número 1220241224230006 com valor 1000.00. Cliente Ramon Dias '),
	('2024-12-25 09:06:47', '2024-12-25 09:06:47', 6, 'Movimentação do tipo levantamento realizada na conta ID 445566632 com valor 1000. Cliente Damião Vicente Paulo,atendido por  '),
	('2024-12-25 09:06:47', '2024-12-25 09:06:47', 7, 'Movimentação do tipo transferencia realizada na conta ID 1220241223153810 com valor 1000. Cliente Saul Raul da Silva'),
	('2024-12-25 09:07:18', '2024-12-25 09:07:18', 8, 'Movimentação do tipo deposito realizada na conta ID 12202412230445566633 com valor 1500. Cliente Marcos Paulo dias Novais,atendido por  ');

-- A despejar estrutura para tabela teste_bank.movimentacao
DROP TABLE IF EXISTS `movimentacao`;
CREATE TABLE IF NOT EXISTS `movimentacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('deposito','levantamento','transferencia') NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `contaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a24ba9185f406e33f0a70dc08ad` (`contaId`),
  CONSTRAINT `FK_a24ba9185f406e33f0a70dc08ad` FOREIGN KEY (`contaId`) REFERENCES `conta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.movimentacao: ~19 rows (aproximadamente)
INSERT INTO `movimentacao` (`id`, `tipo`, `valor`, `contaId`) VALUES
	(85, 'levantamento', 500.00, 10),
	(86, 'transferencia', 500.00, 17),
	(87, 'levantamento', 500.00, 2),
	(88, 'levantamento', 500.00, 2),
	(89, 'transferencia', 500.00, 21),
	(90, 'transferencia', 500.00, 21),
	(91, 'levantamento', 1500.00, 2),
	(92, 'transferencia', 1500.00, 21),
	(93, 'levantamento', 1500.00, 1),
	(94, 'levantamento', 1500.00, 1),
	(95, 'transferencia', 1500.00, 21),
	(96, 'transferencia', 1500.00, 21),
	(97, 'deposito', 1000.00, 10),
	(98, 'deposito', 1000.00, 10),
	(99, 'levantamento', 1500.00, 1),
	(100, 'transferencia', 1500.00, 21),
	(101, 'levantamento', 1000.00, 1),
	(102, 'transferencia', 1000.00, 21),
	(103, 'deposito', 1500.00, 10);

-- A despejar estrutura para tabela teste_bank.transactions
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('CREDITO','DEBITO','TRANSFERENCIA') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.transactions: ~0 rows (aproximadamente)

-- A despejar estrutura para tabela teste_bank.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.user: ~9 rows (aproximadamente)
INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES
	(1, 'Debora Bebiana Fragoso Ngola', 'DBF Ngola', '$2a$10$vv50PA7seaKtbYluVp0eFubn3pBj9oFOubEauNnc7M65vgr/lTTg2'),
	(2, 'Marquinha da Silva Fragoso Ngola', 'marquinha', '$2a$10$gD.oQuRUVObwtBfGB/8W7.xaiF3S.VWw5.vhuYCotPINmZ66vw4Na'),
	(3, 'Emanuel Quitanda Ngola', 'pt', '$2a$10$LTkfT8oBuZevU8PzHhzTL.5ls7DzQIKopE6sW72gwOjfM/x6luwOK'),
	(4, 'Simão Marques Fragoso Ngola', 'SMF Ngola', '$2a$10$/0BX5lL52kXKhveq3moyy.oW62OajUDXH.gdM.KTcPnY81t/Nhbta'),
	(5, 'Gideão Pedro Fragoso Ngola', 'GPF Ngola', '$2a$10$5M8jpyrO0YBOteQ71y1cM.GXa5JHDvE68EYS.qeTcb5P05IyCUiy2'),
	(6, 'Melquisedeque Marcelino Fragoso Ngola', 'MMF Ngola', '$2a$10$fWHMH0YlaPPx2w.jRnFNR.Y.jZSyt9EGJo5thBy2bguGOezPSbMRy'),
	(7, 'Filipa Fragoso Ngola', 'FF Ngola', '$2a$10$5wHC2LIXvpwvq5bUz/cu1ekCpGp.ztT5FKSFKdsM2/oL6nJjnVzwC'),
	(8, 'Debora Bebiana Fragoso Ngola', 'DBF Ngola', '$2a$10$qFyNI6tNTysktQvbB/kfXe7g1wdQ7naNIbiMjALKfaLtjRJaaw58i'),
	(9, 'Manuela Princesa Fragoso Ngola', 'MPF Ngola', '$2a$10$tabGJpXjgeE..IFSVx0gb.B.kL7DRccYiimbA7dwZJ/pBQ2SbIBja');

-- A despejar estrutura para tabela teste_bank.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A despejar dados para tabela teste_bank.users: ~10 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `created_at`, `updated_at`) VALUES
	(1, 'Marcos Paulo dias Novais', 'Marcos Novais', '$2a$10$Nu6jZK.S2Fcl2wreDAv68eup1v22lr7kF52w5MYMUmNhvrBrewstq', 'emanuelngola33@gmail.com', '2024-12-22 14:35:51', '2024-12-22 14:35:51'),
	(9, 'Sandro António Xavier', 'Sandro', '$2a$10$b9nP5oyrKOPdJE.axcLgwuXYpw.AcMjVWxiysS3TJWUKvH21MWR5m', 'sandroantonioxavier@hotmail.com.com', '2024-12-22 18:19:09', '2024-12-22 18:19:09'),
	(10, 'Saul Raul da Silva', 'Sandro', '$2a$10$X3ZMZSE7UfpgwhFBv6.Ame7L3ssj6g59MuqyCnE8J7PjEcHosXukW', 'saulraul@hotmail.com.com', '2024-12-22 20:33:43', '2024-12-22 20:33:43'),
	(12, 'Saul Raul da Silva', 'Sandro', '$2a$10$zNmj8x/OTWvogVr9hxRTHuRmElz9JIGfGSWNKqqDrC/uBgnQFdiR.', 'saulraul1@hotmail.com.com', '2024-12-22 20:34:08', '2024-12-22 20:34:08'),
	(13, 'Damião Vicente Paulo', 'DVincente', '$2a$10$.70QjV6zrEx21vbpNDWfaO9BQjeJ.5PcUp59ZxBj/JwjrI8zdw9b2', 'damiaovicente@hotmail.com.com', '2024-12-22 20:36:37', '2024-12-22 20:36:37'),
	(14, 'Deltan Dallanol', 'Deltan', '$2a$10$4pPblHgEJyP3X3bXj9f5K.Vbx0sgrDD0a6WZpZr3xC8p/ZwNciIBm', 'deltan@hotmail.com.com', '2024-12-22 20:42:25', '2024-12-22 20:42:25'),
	(17, 'Ramon Dias', 'Ramon', '$2a$10$v1CESE2DbwWKFR/JAQ9RpeCueSjKLD4Kdp/87u.O9u.BGO2mS.jX.', 'rmon@hotmail.com', '2024-12-22 20:44:20', '2024-12-22 20:44:20'),
	(19, 'Ramon Dias', 'Ramon', '$2a$10$zG98PnfZTNcjxI2ypDTOgOuXUNSTWkkZes5imLhfwdx1bF.i1MUvy', 'ramon@hotmail.com', '2024-12-23 08:56:41', '2024-12-23 08:56:41'),
	(21, 'Ra', 'Ramon', '$2a$10$ihpC0yBu49IV6wmqSX2g0uhPsa7uVerlyAeXoBzqGq94bqaCPSaVW', 'ramon13@hotmail.com', '2024-12-23 09:43:09', '2024-12-23 09:43:09'),
	(22, 'Ramon Dias', 'Ramon', '$2a$10$NtDxhVYJhrQmQ1XwfphCmOsZscljCT028qY2E/W.6Epdx7jTbyZBu', 'deltandallanol2@hotmail.com', '2024-12-23 10:24:35', '2024-12-23 10:24:35');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
