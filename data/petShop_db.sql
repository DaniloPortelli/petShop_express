-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: petshop_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionid` varchar(255) NOT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `addeddate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_product_id_foreign` (`product_id`),
  CONSTRAINT `cart_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,'session_abc123',1,1,'2025-03-10 14:00:00'),(2,'session_abc123',3,2,'2025-03-10 14:05:00'),(3,'session_xyz789',4,1,'2025-03-12 09:30:00');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cibo per cani'),(2,'Cibo per gatti'),(3,'Giochi per animali'),(4,'Accessori per animali');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discountcodes`
--

DROP TABLE IF EXISTS `discountcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discountcodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discountcodes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discountcodes`
--

LOCK TABLES `discountcodes` WRITE;
/*!40000 ALTER TABLE `discountcodes` DISABLE KEYS */;
INSERT INTO `discountcodes` VALUES (1,'ANIMAL10',10.00,'2025-03-01','2025-03-31'),(2,'FREESHIP',0.00,'2025-03-05','2025-03-15');
/*!40000 ALTER TABLE `discountcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guestorderdetails`
--

DROP TABLE IF EXISTS `guestorderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestorderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unitprice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guestorderdetails_order_id_foreign` (`order_id`),
  KEY `guestorderdetails_product_id_foreign` (`product_id`),
  CONSTRAINT `guestorderdetails_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `guestorders` (`id`),
  CONSTRAINT `guestorderdetails_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestorderdetails`
--

LOCK TABLES `guestorderdetails` WRITE;
/*!40000 ALTER TABLE `guestorderdetails` DISABLE KEYS */;
INSERT INTO `guestorderdetails` VALUES (1,1,1,2,15.99),(2,1,3,1,7.49),(3,2,2,5,2.49),(4,2,4,1,12.50);
/*!40000 ALTER TABLE `guestorderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guestorders`
--

DROP TABLE IF EXISTS `guestorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestorders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guestname` varchar(255) NOT NULL,
  `guestemail` varchar(255) NOT NULL,
  `shippingaddress` text NOT NULL,
  `orderdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `discountcode_id` int DEFAULT NULL,
  `freeshipping` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guestorders_discountcode_id_foreign` (`discountcode_id`),
  CONSTRAINT `guestorders_discountcode_id_foreign` FOREIGN KEY (`discountcode_id`) REFERENCES `discountcodes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestorders`
--

LOCK TABLES `guestorders` WRITE;
/*!40000 ALTER TABLE `guestorders` DISABLE KEYS */;
INSERT INTO `guestorders` VALUES (1,'Mario Rossi','mario.rossi@email.com','Via Roma 123, Milano','2025-03-10 14:30:00',1,0),(2,'Lucia Bianchi','lucia.bianchi@email.com','Piazza Garibaldi 45, Roma','2025-03-12 10:00:00',2,1);
/*!40000 ALTER TABLE `guestorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productname` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Crocchette per cani Adulto','Cibo secco bilanciato per cani adulti',19.99,1,'crocchette_cani.jpg',30,'PetFoodCo'),(2,'Cibo umido per gatti con tonno','Cibo umido per gatti con carne di tonno',2.99,2,'cibo_umbrio_gatti.jpg',30,'CatFoodBrand'),(3,'Palla da gioco per cani','Palla da gioco resistente per cani di taglia media',8.99,3,'palla_cani.jpg',20,'PlayPaw'),(4,'Collare riflettente per cani','Collare riflettente per cani, ideale per passeggiate notturne',12.50,4,'collare_cani.jpg',40,'SafeWalk');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `originalprice` decimal(10,2) NOT NULL,
  `discountedprice` decimal(10,2) NOT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `promotions_product_id_foreign` (`product_id`),
  CONSTRAINT `promotions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,1,19.99,15.99,'2025-03-01','2025-03-31'),(2,2,2.99,2.49,'2025-03-10','2025-03-20'),(3,3,8.99,7.49,'2025-03-15','2025-03-25');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatedproducts`
--

DROP TABLE IF EXISTS `relatedproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatedproducts` (
  `productid` int NOT NULL,
  `relatedproductid` int NOT NULL,
  PRIMARY KEY (`productid`,`relatedproductid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatedproducts`
--

LOCK TABLES `relatedproducts` WRITE;
/*!40000 ALTER TABLE `relatedproducts` DISABLE KEYS */;
INSERT INTO `relatedproducts` VALUES (1,3),(2,1),(4,3);
/*!40000 ALTER TABLE `relatedproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionid` varchar(255) NOT NULL,
  `product_id` int DEFAULT NULL,
  `addeddate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `wishlist_product_id_foreign` (`product_id`),
  CONSTRAINT `wishlist_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,'session_abc123',1,'2025-03-10 14:00:00'),(2,'session_xyz789',2,'2025-03-12 09:30:00');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 15:46:28
