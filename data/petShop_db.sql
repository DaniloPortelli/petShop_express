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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cibo'),(2,'Giochi'),(3,'Accessori'),(4,'Igiene'),(5,'Salute'),(6,'Trasporto');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discount_codes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
INSERT INTO `discount_codes` VALUES (1,'DISCOUNT10',10.00,'2025-04-01','2025-04-30'),(2,'SAVE15NOW',15.00,'2025-04-01','2025-05-31'),(3,'SPRING25',25.00,'2025-04-01','2025-04-15'),(4,'WELCOME5',5.00,'2025-04-01','2025-12-31'),(5,'FREESHIP',0.00,'2025-04-01','2025-04-30');
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  KEY `order_details_product_id_foreign` (`product_id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `shipping_address` text NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `discount_code_id` int DEFAULT NULL,
  `shipping_cost` decimal(10,2) DEFAULT NULL,
  `billing_address` text NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_discount_code_id_foreign` (`discount_code_id`),
  CONSTRAINT `orders_discount_code_id_foreign` FOREIGN KEY (`discount_code_id`) REFERENCES `discount_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `quantity` tinyint DEFAULT NULL,
  `brand` enum('Monge','Whiskas','PetSafe','Catit') NOT NULL,
  `discounted_price` decimal(10,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `slug` varchar(100) NOT NULL,
  `animals` enum('cani','gatti') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Crocchette per cani adulti','Crocchette di alta qualità per cani adulti di tutte le taglie, nutrienti e facili da digerire, che supportano la salute del tuo cane e mantengono il pelo lucido e sano.',25.99,1,'crocchette_cani.jpg',50,'Monge',22.99,'2023-10-26','2023-11-26','crocchette-cani-adulti','cani'),(2,'Tiragraffi per gatti','Tiragraffi resistente per gatti, ideale per affilare le unghie e per l\'intrattenimento, realizzato con materiali di alta qualità per durare a lungo.',19.99,2,'tiragraffi_gatti.jpg',30,'Catit',17.99,'2023-10-26','2023-11-26','tiragraffi-gatti','gatti'),(3,'Guinzaglio per cani','Guinzaglio resistente e confortevole per cani di tutte le taglie, progettato per garantire sicurezza e comfort durante le passeggiate quotidiane.',12.50,3,'guinzaglio_cani.jpg',20,'PetSafe',10.00,'2023-10-26','2023-11-26','guinzaglio-cani','cani'),(4,'Lettiera per gatti','Lettiera igienica e assorbente per gatti, progettata per ridurre i cattivi odori e garantire un ambiente pulito e sicuro per il tuo gatto.',15.00,4,'lettiera_gatti.jpg',40,'Catit',13.50,'2023-10-26','2023-11-26','lettiera-gatti','gatti'),(5,'Shampoo per cani','Shampoo delicato per cani, ideale per pelli sensibili e per mantenere il pelo morbido, pulito e privo di irritazioni.',9.99,4,'shampoo_cani.jpg',25,'PetSafe',8.99,'2023-10-26','2023-11-26','shampoo-cani','cani'),(6,'Cibo umido per gatti','Cibo umido gustoso e nutriente per gatti adulti, arricchito con proteine di alta qualità per garantire un\'alimentazione sana e bilanciata.',18.00,1,'cibo_umido_gatti.jpg',60,'Whiskas',16.00,'2023-10-26','2023-11-26','cibo-umido-gatti','gatti'),(7,'Osso di pelle di bufalo','Osso naturale per la masticazione dei cani, aiuta a mantenere i denti puliti e soddisfa la voglia di masticare in modo sicuro e salutare.',7.99,2,'osso_bufalo.jpg',100,'Monge',6.99,'2023-10-26','2023-11-26','osso-pelle-bufalo','cani'),(8,'Ciotola in acciaio inox','Ciotola resistente e facile da pulire per cibo e acqua, con un design semplice ed elegante per il comfort del tuo cane o gatto.',10.50,3,'ciotola_acciaio.jpg',80,'Monge',9.00,'2023-10-26','2023-11-26','ciotola-acciaio-inox','cani'),(9,'Cuccia per gatti','Cuccia morbida e confortevole per gatti, ideale per il riposo e per creare un angolo tranquillo e sicuro per il tuo gatto.',35.00,3,'cuccia_gatti.jpg',20,'Catit',30.00,'2023-10-26','2023-11-26','cuccia-gatti','gatti'),(10,'Spazzola per cani','Spazzola per la toelettatura dei cani, rimuove il pelo morto e mantiene il pelo lucido, riducendo la perdita di pelo e migliorando la salute del pelo.',14.99,4,'spazzola_cani.jpg',50,'PetSafe',12.99,'2023-10-26','2023-11-26','spazzola-cani','cani'),(11,'Cibo secco per gatti sterilizzati','Alimento bilanciato per gatti sterilizzati, favorisce il mantenimento del peso ideale e supporta la salute a lungo termine del tuo gatto.',22.00,1,'cibo_secco_sterilizzati.jpg',40,'Whiskas',20.00,'2023-10-26','2023-11-26','cibo-secco-gatti-sterilizzati','gatti'),(12,'Trasportino per cani','Trasportino robusto e sicuro per il trasporto dei cani in auto o in aereo, progettato per garantire la sicurezza e il comfort del tuo animale durante i viaggi.',45.00,6,'trasportino_cani.jpg',15,'PetSafe',40.00,'2023-10-26','2023-11-26','trasportino-cani','cani'),(13,'Collare per cani regolabile','Collare resistente e regolabile per cani di tutte le taglie, con design ergonomico per garantire una vestibilità comoda e sicura.',15.50,3,'collare_cani.jpg',60,'Monge',12.50,'2023-10-26','2023-11-26','collare-cani-regolabile','cani'),(14,'Collare antipulci per gatti','Collare antipulci per gatti, adatto per la protezione duratura contro pulci e zecche, progettato per garantire una protezione continua.',10.99,4,'collare_antipulci_gatti.jpg',50,'Whiskas',9.00,'2023-10-26','2023-11-26','collare-antipulci-gatti','gatti'),(15,'Giocattolo interattivo per cani','Giocattolo che stimola l\'intelligenza dei cani, ideale per l\'allenamento e per mantenere il tuo cane attivo e coinvolto.',18.00,2,'giocattolo_cani.jpg',40,'PetSafe',15.00,'2023-10-26','2023-11-26','giocattolo-interattivo-cani','cani'),(16,'Ciotola per gatti con fontanella','Ciotola automatica per gatti con fontanella per acqua fresca, mantiene l\'acqua pulita e sempre disponibile per il tuo gatto.',29.99,3,'ciotola_fontanella_gatti.jpg',30,'Catit',25.00,'2023-10-26','2023-11-26','ciotola-fontanella-gatti','gatti'),(17,'Lettino ortopedico per cani','Lettino ortopedico comodo per cani, ideale per cani anziani o con problematiche articolari, offre il massimo del comfort e supporto durante il sonno.',49.99,3,'lettino_ortopedico_cani.jpg',20,'PetSafe',45.00,'2023-10-26','2023-11-26','lettino-ortopedico-cani','cani'),(18,'Cuscino per gatti con supporto','Cuscino morbido e supportivo per gatti che amano dormire comodi, realizzato con materiali di alta qualità per garantire un riposo ottimale.',22.00,3,'cuscino_gatti.jpg',25,'Catit',18.00,'2023-10-26','2023-11-26','cuscino-gatti-supporto','gatti'),(19,'Snack per cani con pollo','Deliziosi snack per cani a base di pollo, ideali per premiare il tuo amico a quattro zampe e per mantenerlo in forma con ingredienti naturali.',5.50,1,'snack_pollo_cani.jpg',100,'Monge',4.50,'2023-10-26','2023-11-26','snack-pollo-cani','cani'),(20,'Letto riscaldato per gatti','Letto riscaldato per gatti, perfetto per l\'inverno, che offre calore e comfort per il tuo gatto durante i periodi più freddi dell\'anno.',39.99,3,'letto_riscaldato_gatti.jpg',15,'Whiskas',35.00,'2023-10-26','2023-11-26','letto-riscaldato-gatti','gatti'),(21,'Tappetino per cani in memory foam','Tappetino ortopedico in memory foam per il massimo comfort dei cani, supporta le articolazioni e allevia la pressione durante il riposo.',44.99,3,'tappetino_memory_cani.jpg',30,'PetSafe',40.00,'2023-10-26','2023-11-26','tappetino-memory-cani','cani'),(22,'Cibo secco per gatti senior','Cibo secco nutriente per gatti anziani, facilmente digeribile e ricco di vitamine e minerali per mantenere i gatti senior in salute.',25.00,1,'cibo_secco_senior_gatti.jpg',50,'Whiskas',22.50,'2023-10-26','2023-11-26','cibo-secco-senior-gatti','gatti'),(23,'Giocattolo per gatti con catnip','Giocattolo con catnip per gatti, stimola l\'attività fisica e mentale, ideale per il divertimento del tuo gatto.',7.50,2,'giocattolo_catnip_gatti.jpg',80,'Catit',6.50,'2023-10-26','2023-11-26','giocattolo-catnip-gatti','gatti'),(24,'Guinzaglio retrattile per cani','Guinzaglio retrattile per cani, pratico per passeggiate all\'aria aperta, che consente al cane di muoversi liberamente in sicurezza.',25.00,3,'guinzaglio_retrattile_cani.jpg',35,'PetSafe',20.00,'2023-10-26','2023-11-26','guinzaglio-retrattile-cani','cani'),(25,'Cibo secco per cani adulti','Alimento secco per cani adulti, ricco di proteine e nutriente, per una dieta sana ed equilibrata che supporta la salute e l\'energia del tuo cane.',28.00,1,'cibo_secco_cani_adulti.jpg',50,'Monge',25.00,'2023-10-26','2023-11-26','cibo-secco-cani-adulti','cani'),(26,'Cassetta igienica per gatti','Cassetta igienica per gatti, facile da pulire con bordo alto per evitare fuoriuscite e garantire un ambiente sempre pulito per il tuo gatto.',18.00,4,'casetta_igienica_gatti.jpg',40,'Whiskas',15.50,'2023-10-26','2023-11-26','casetta-igienica-gatti','gatti'),(27,'Fleecy blanket per cani','Coperta calda e morbida per cani, ideale per l\'inverno, offre comfort e protezione contro il freddo.',24.00,3,'fleece_blanket_cani.jpg',30,'PetSafe',20.00,'2023-10-26','2023-11-26','fleece-blanket-cani','cani'),(28,'Letto per gatti in peluche','Letto in peluche morbido per gatti, perfetto per il sonno e il relax, un angolo accogliente dove il tuo gatto può riposare comodamente.',38.50,3,'letto_peluche_gatti.jpg',25,'Catit',32.00,'2023-10-26','2023-11-26','letto-peluche-gatti','gatti'),(29,'Orecchie di maiale per cani','Snack naturale per cani, gustose orecchie di maiale per la masticazione, che aiutano a mantenere i denti puliti e a soddisfare il desiderio di masticare.',7.00,2,'orecchie_maiale_cani.jpg',100,'Monge',5.50,'2023-10-26','2023-11-26','orecchie-maiale-cani','cani'),(30,'Morbido tappetino per gatti','Tappetino morbido per gatti, ideale per dormire o fare il grooming, realizzato con materiali di alta qualità per garantire il massimo comfort.',16.00,3,'tappetino_morbido_gatti.jpg',50,'Whiskas',14.00,'2023-10-26','2023-11-26','tappetino-morbido-gatti','gatti'),(31,'Gioco per cani con corda','Gioco per cani con corda, perfetto per giochi di tiraggio e interazione, che aiuta a mantenere il cane attivo e divertito.',11.50,2,'gioco_corda_cani.jpg',70,'PetSafe',9.50,'2023-10-26','2023-11-26','gioco-corda-cani','cani'),(32,'Trasportino pieghevole per gatti','Trasportino pieghevole per gatti, pratico e sicuro per i viaggi, ideale per il trasporto in auto o in aereo.',30.00,6,'trasportino_pieghevole_gatti.jpg',20,'Catit',27.00,'2023-10-26','2023-11-26','trasportino-pieghevole-gatti','gatti'),(33,'Biscotti per cani al salmone','Biscotti deliziosi per cani con salmone, perfetti come snack o premio, facili da digerire e ricchi di nutrienti.',9.99,1,'biscotti_salmone_cani.jpg',80,'Monge',8.50,'2023-10-26','2023-11-26','biscotti-salmone-cani','cani'),(34,'Letto per gatti in stile giungla','Letto per gatti a tema giungla, con materiali resistenti e comodi per il riposo, un angolo perfetto per il sonno del tuo gatto.',50.00,3,'letto_giungla_gatti.jpg',10,'Whiskas',45.00,'2023-10-26','2023-11-26','letto-giungla-gatti','gatti'),(35,'Guinzaglio per gatti con pettorina','Guinzaglio con pettorina per gatti, ideale per passeggiate all\'aperto, che offre comfort e sicurezza durante l\'uscita.',12.00,3,'guinzaglio_pettorina_gatti.jpg',40,'PetSafe',10.50,'2023-10-26','2023-11-26','guinzaglio-pettorina-gatti','gatti');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-02 17:50:14
