-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: consorcio
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cidades`
--

DROP TABLE IF EXISTS `cidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidades` (
  `CODIGO_CIDADE` int NOT NULL,
  `NOME` varchar(100) DEFAULT NULL,
  `ESTADO` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CODIGO_CIDADE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `CGC_CPF_CLIENTE` varchar(15) NOT NULL,
  `NOME` varchar(255) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `CODIGO_TIPO_DOC_IDENT` int DEFAULT NULL,
  `NACIONALIDADE` varchar(50) DEFAULT NULL,
  `nome_pai` varchar(255) DEFAULT NULL,
  `NOME_MAE` varchar(255) DEFAULT NULL,
  `DOCUMENTO` varchar(20) DEFAULT NULL,
  `ORGAO_EMISSOR` varchar(50) DEFAULT NULL,
  `UF_DOC_CLIENTE` varchar(2) DEFAULT NULL,
  `ENDERECO` varchar(255) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `CEP` varchar(10) DEFAULT NULL,
  `CODIGO_CIDADE` int DEFAULT NULL,
  PRIMARY KEY (`CGC_CPF_CLIENTE`),
  KEY `CODIGO_CIDADE` (`CODIGO_CIDADE`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`CODIGO_CIDADE`) REFERENCES `cidades` (`CODIGO_CIDADE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cotas`
--

DROP TABLE IF EXISTS `cotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotas` (
  `numero_contrato` int DEFAULT NULL,
  `CGC_CPF_CLIENTE` varchar(15) DEFAULT NULL,
  `CODIGO_GRUPO` int DEFAULT NULL,
  `CODIGO_COTA` int DEFAULT NULL,
  `VERSAO` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-23  1:42:34
