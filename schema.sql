DROP
DATABASE
IF
EXISTS
`restaurant`;

CREATE
DATABASE
`restaurant`;

USE
`restaurant`;


DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE `ingredient`
(
  `id`       int(11) NOT NULL AUTO_INCREMENT,
  `name`     varchar(50) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory`
(
  `id`    int(11) NOT NULL AUTO_INCREMENT,
  `name`  varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `unit`  varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`
(
  `id`       int(11) NOT NULL AUTO_INCREMENT,
  `name`     varchar(50) NOT NULL,
  `price`    int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `recipe_item`;
CREATE TABLE `recipe_item`
(
  `id`              int(11) NOT NULL AUTO_INCREMENT,
  `quantity`        int(11) NOT NULL,
  `unit`            varchar(10) NOT NULL,
  `inventoryItemId` int(11) DEFAULT NULL,
  `ingredientId`    int(11) DEFAULT NULL,
  `recipeId`        int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;