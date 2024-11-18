-- MySQL Script generated by MySQL Workbench
-- dom 27 out 2024 19:27:35
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema estacao_meteorologica
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema estacao_meteorologica
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `estacao_meteorologica` DEFAULT CHARACTER SET utf8mb4 ;
USE `estacao_meteorologica` ;

-- -----------------------------------------------------
-- Table `estacao_meteorologica`.`dados_diarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacao_meteorologica`.`dados_diarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `temperature` VARCHAR(45) NULL DEFAULT NULL,
  `humidity` INT(45) NULL DEFAULT NULL,
  `rainfall` INT(45) NULL DEFAULT NULL,
  `wind_speed_kmh` INT(45) NULL DEFAULT NULL,
  `data_hora` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 548
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `estacao_meteorologica`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacao_meteorologica`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 623
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `estacao_meteorologica`.`estacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estacao_meteorologica`.`estacao` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `endereco` VARCHAR(45) NULL DEFAULT NULL,
  `latitude` DOUBLE NULL DEFAULT NULL,
  `longitude` DOUBLE NULL DEFAULT NULL,
  `ip` VARCHAR(45) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_estacao_usuario` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_estacao_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `estacao_meteorologica`.`usuario` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 767
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;