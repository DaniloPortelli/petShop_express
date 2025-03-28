
-- Creazione delle tabelle
CREATE TABLE `categories` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `products` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `category_id` INT NULL,
    `image_url` VARCHAR(255) NULL,
    `quantity` TINYINT NULL,
    `brand` ENUM('Monge', 'Whiskas', 'PetSafe', 'Catit') NOT NULL,
    `discounted_price` DECIMAL(10, 2) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `animals` ENUM('cani', 'gatti', 'altri') NOT NULL
);

CREATE TABLE `discount_codes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL,
    `discount` DECIMAL(5, 2) NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL
);

ALTER TABLE
    `discount_codes` ADD UNIQUE `discount_codes_code_unique`(`code`);

CREATE TABLE `orders` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `shipping_address` TEXT NOT NULL,
    `order_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    `discount_code_id` INT NULL,
    `shipping_cost` DECIMAL(10, 2) NULL,
    `billing_address` TEXT NOT NULL
);

CREATE TABLE `order_details` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NULL,
    `product_id` INT NULL,
    `quantity` INT NULL,
    `price` DECIMAL(10, 2) NULL,
    `name` VARCHAR(255) NOT NULL
);

-- Impostazione delle chiavi esterne
ALTER TABLE
    `products` ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE
    `orders` ADD CONSTRAINT `orders_discount_code_id_foreign` FOREIGN KEY(`discount_code_id`) REFERENCES `discount_codes`(`id`);

ALTER TABLE
    `order_details` ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE
    `order_details` ADD CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);

-- Inserimento delle categorie
INSERT INTO `categories` (`name`) VALUES
('Cibo'),
('Giochi'),
('Accessori'),
('Igiene'),
('Salute'),
('Trasporto');

-- Inserimento dei prodotti (con brand NOT NULL)
UPDATE products SET brand = 'Monge' WHERE brand IS NULL;

INSERT INTO `products` (`name`, `description`, `price`, `category_id`, `image_url`, `quantity`, `brand`, `discounted_price`, `start_date`, `end_date`, `slug`, `animals`) VALUES
('Crocchette per cani adulti', 'Crocchette di alta qualità per cani adulti di tutte le taglie.', 25.99, 1, 'crocchette_cani.jpg', 50, 'Monge', 22.99, '2023-10-26', '2023-11-26', 'crocchette-cani-adulti', 'cani'),
('Tiragraffi per gatti', 'Tiragraffi resistente per gatti, ideale per affilare le unghie.', 19.99, 2, 'tiragraffi_gatti.jpg', 30, 'Catit', 17.99, '2023-10-26', '2023-11-26', 'tiragraffi-gatti', 'gatti'),
('Guinzaglio per cani', 'Guinzaglio resistente e confortevole per cani di tutte le taglie.', 12.50, 3, 'guinzaglio_cani.jpg', 20, 'PetSafe', 10.00, '2023-10-26', '2023-11-26', 'guinzaglio-cani', 'cani'),
('Lettiera per gatti', 'Lettiera igienica e assorbente per gatti.', 15.00, 4, 'lettiera_gatti.jpg', 40, 'Catit', 13.50, '2023-10-26', '2023-11-26', 'lettiera-gatti', 'gatti'),
('Shampoo per cani', 'Shampoo delicato per cani, ideale per pelli sensibili.', 9.99, 4, 'shampoo_cani.jpg', 25, 'PetSafe', 8.99, '2023-10-26', '2023-11-26', 'shampoo-cani', 'cani'),
('Cibo umido per gatti', 'Cibo umido gustoso e nutriente per gatti adulti.', 18.00, 1, 'cibo_umido_gatti.jpg', 60, 'Whiskas', 16.00, '2023-10-26', '2023-11-26', 'cibo-umido-gatti', 'gatti'),
('Osso di pelle di bufalo', 'Osso naturale per la masticazione dei cani, aiuta a mantenere i denti puliti.', 7.99, 2, 'osso_bufalo.jpg', 100, 'Monge', 6.99, '2023-10-26', '2023-11-26', 'osso-pelle-bufalo', 'cani'),
('Ciotola in acciaio inox', 'Ciotola resistente e facile da pulire per cibo e acqua.', 10.50, 3, 'ciotola_acciaio.jpg', 80, 'Monge', 9.00, '2023-10-26', '2023-11-26', 'ciotola-acciaio-inox', 'cani'),
('Cuccia per gatti', 'Cuccia morbida e confortevole per gatti, ideale per il riposo.', 35.00, 3, 'cuccia_gatti.jpg', 20, 'Catit', 30.00, '2023-10-26', '2023-11-26', 'cuccia-gatti', 'gatti'),
('Spazzola per cani', 'Spazzola per la toelettatura dei cani, rimuove il pelo morto e mantiene il pelo lucido.', 14.99, 4, 'spazzola_cani.jpg', 50, 'PetSafe', 12.99, '2023-10-26', '2023-11-26', 'spazzola-cani', 'cani'),
('Cibo secco per gatti sterilizzati', 'Alimento bilanciato per gatti sterilizzati, favorisce il mantenimento del peso ideale.', 22.00, 1, 'cibo_secco_sterilizzati.jpg', 40, 'Whiskas', 20.00, '2023-10-26', '2023-11-26', 'cibo-secco-gatti-sterilizzati', 'gatti'),
('Trasportino per cani', 'Trasportino robusto e sicuro per il trasporto dei cani in auto o in aereo.', 45.00, 6, 'trasportino_cani.jpg', 15, 'PetSafe', 40.00, '2023-10-26', '2023-11-26', 'trasportino-cani', 'cani')
