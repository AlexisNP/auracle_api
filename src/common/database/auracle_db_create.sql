DROP DATABASE IF EXISTS auracle;
CREATE DATABASE auracle CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE auracle;

/* =========== PRIMARY TABLES =========== */

-- ROLES
CREATE TABLE IF NOT EXISTS `role` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

-- PERMISSIONS
CREATE TABLE IF NOT EXISTS `permission` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `slug` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

-- USERS
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `uuid` VARCHAR(36) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL DEFAULT "Disciple",
    `mail` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255),
    `gender` VARCHAR(255),
    `register_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
    `verified` BOOLEAN DEFAULT false,
    `verification_token` VARCHAR(255),
    `banned` BOOLEAN DEFAULT false,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`role_id`) REFERENCES role(`id`)
);

-- API_TOKENS
CREATE TABLE IF NOT EXISTS `api_token` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `value` VARCHAR(255) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL UNIQUE,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_uuid`) REFERENCES user(`uuid`)
);

-- SPELLS
CREATE TABLE IF NOT EXISTS `spell` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom du sort",
    `description` VARCHAR(1000) NOT NULL DEFAULT "Description du sort",
    `level` INT UNSIGNED DEFAULT 0,
    `charge` INT UNSIGNED DEFAULT 0,
    `cost` VARCHAR(255) DEFAULT 0,
    `is_ritual` BOOLEAN DEFAULT false,
    `published` BOOLEAN DEFAULT false,
    `public` BOOLEAN DEFAULT true,
    `author_id` INT UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`author_id`) REFERENCES user(`id`)
);

-- META SCHOOLS
CREATE TABLE IF NOT EXISTS `meta_school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école mère",
    `description` VARCHAR(255) DEFAULT "Description de l'école mère",
    PRIMARY KEY (`id`)
);

-- SCHOOLS
CREATE TABLE IF NOT EXISTS `school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école",
    `description` VARCHAR(255) DEFAULT "Description de l'école",
    `published` BOOLEAN DEFAULT false,
    `meta_school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`meta_school_id`) REFERENCES meta_school(`id`)
);

-- COMMON INGREDIENTS
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL DEFAULT "Langue de salamandre",
    `description` VARCHAR(255) NOT NULL DEFAULT "Une langue de salamandre de feu encore chaude.",
    `published` BOOLEAN DEFAULT false,
    PRIMARY KEY (`id`)
);

-- COMMON VARIABLES
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    `description` VARCHAR(255) NOT NULL DEFAULT "Nombre de créatures affectées",
    `published` BOOLEAN DEFAULT false,
    PRIMARY KEY (`id`)
);

/* ==== ASSOCIATION TABLES ==== */

-- SPELLS' SCHOOLS
-- One spell can have multiple (up to 3) schools
CREATE TABLE IF NOT EXISTS `spell_school` (
    `spell_id` INT UNSIGNED NOT NULL,
    `school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `school_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`school_id`) REFERENCES school(`id`)
);

-- SPELLS' VARIABLES
-- One spell can have multiple (up to 2) variables of cost
CREATE TABLE IF NOT EXISTS `spell_variable` (
    `spell_id` INT UNSIGNED NOT NULL,
    `variable_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `variable_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`variable_id`) REFERENCES variable(`id`)
);

-- SPELLS' VARIABLES
-- One spell can have multiple ingredients
CREATE TABLE IF NOT EXISTS `spell_ingredient` (
    `spell_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `ingredient_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`ingredient_id`) REFERENCES ingredient(`id`)
);

-- ROLES' PERMISSIONS
-- One role can have any number of permissions, or none at all
CREATE TABLE IF NOT EXISTS `role_permission` (
    `role_id` INT UNSIGNED NOT NULL,
    `permission_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY(`role_id`) REFERENCES role(`id`),
    FOREIGN KEY(`permission_id`) REFERENCES permission(`id`)
);

-- Ajout d`une nouvelle ligne avant l`insert de description
DELIMITER $$
CREATE TRIGGER `multiLine` BEFORE INSERT ON `spell` FOR EACH ROW
BEGIN
    SET NEW.description = replace(NEW.description, "<l>", "\n");
END$$
DELIMITER ;

/* =========== PRIMARY INSERTS =========== */
SET NAMES utf8;

-- CSV DATA
LOAD DATA INFILE 'C:/temp/auracle_data/permission.csv'
  INTO TABLE `permission` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/role.csv'
  INTO TABLE `role` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/role_permission.csv'
  INTO TABLE `role_permission` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/user.csv'
  INTO TABLE `user` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/api_token.csv'
  INTO TABLE `api_token` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/spell.csv'
  INTO TABLE `spell` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/meta_school.csv'
  INTO TABLE `meta_school` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/school.csv'
  INTO TABLE `school` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/ingredient.csv'
  INTO TABLE `ingredient` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/variable.csv'
  INTO TABLE `variable` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/temp/auracle_data/spell_school.csv'
  INTO TABLE `spell_school` 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;
