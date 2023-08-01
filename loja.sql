-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18/07/2023 às 01:12
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `loja`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtosprimario`
--

CREATE TABLE `produtosprimario` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Name` text NOT NULL,
  `Classificacao` text NOT NULL,
  `Disponivel` tinyint(1) NOT NULL,
  `codProduto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `produtosprimario`
--

INSERT INTO `produtosprimario` (`ID`, `Name`, `Classificacao`, `Disponivel`, `codProduto`) VALUES
(44, 'sucrilhos keloggs', 'alimentício', 1, 'cc9f174352'),
(45, 'sucrilhos keloggs', 'alimentício', 1, '1c0792c2e4'),
(46, '', '', 1, '88063dc8cd');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtossecundario`
--

CREATE TABLE `produtossecundario` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Cor` text NOT NULL,
  `Tamanho` char(10) NOT NULL,
  `Preco` decimal(10,0) NOT NULL,
  `Qtd` int(11) NOT NULL,
  `ParentId` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `produtossecundario`
--

INSERT INTO `produtossecundario` (`ID`, `Cor`, `Tamanho`, `Preco`, `Qtd`, `ParentId`) VALUES
(15, '#000000', 'P', 150, 999, 'cc9f174352'),
(16, '#000000', 'G', 250, 10001, 'cc9f174352'),
(17, '#000000', 'P', 150, 999, '1c0792c2e4'),
(18, '#000000', 'G', 250, 10001, '1c0792c2e4'),
(19, '#000000', 'pequeno', 55, 55, '88063dc8cd'),
(20, '#000000', 'grande', 90, 105, '88063dc8cd'),
(21, '#ff0000', 'pequeno', 55, 90, '88063dc8cd'),
(22, '#ff0000', 'grande', 90, 77, '88063dc8cd'),
(23, '#f3f708', 'pequeno', 55, 84, '88063dc8cd'),
(24, '#f3f708', 'grande', 90, 1000, '88063dc8cd');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` mediumint(5) NOT NULL,
  `Name` text NOT NULL,
  `YearsOld` int(10) DEFAULT NULL,
  `Email` varchar(300) NOT NULL,
  `Password` text NOT NULL,
  `PhoneNumber` text NOT NULL,
  `UserType` tinyint(1) NOT NULL DEFAULT 0,
  `carrinho` longtext NOT NULL,
  `favoritos` longtext NOT NULL,
  `codAcess` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='normal: 0, admin: 1';

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Name`, `YearsOld`, `Email`, `Password`, `PhoneNumber`, `UserType`, `carrinho`, `favoritos`, `codAcess`) VALUES
(1, 'fdsafsd', 4, 'dsfa', 'asdf', 'asdf', 0, 'asdfsadfasdfdsf', 'asdfsadfsdafdsa', ''),
(2, '987', 987, '987', '987', '9', 0, '', '', ''),
(3, '45', 45, '45', '45', '45', 0, '', '', ''),
(4, '45', 45, '45', '45', '45', 0, '', '', ''),
(5, 'felipe', 34, 'felipeluizmsouza@gmail.com', 'sucrilho', ' 5513997673802', 1, '{\"items\":[\"1c0792c2e4\"],\"qtds\":[4]}', '', '2i6eflpe');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtosprimario`
--
ALTER TABLE `produtosprimario`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Índices de tabela `produtossecundario`
--
ALTER TABLE `produtossecundario`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtosprimario`
--
ALTER TABLE `produtosprimario`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `produtossecundario`
--
ALTER TABLE `produtossecundario`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` mediumint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
