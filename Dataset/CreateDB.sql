#create database artdb;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
#SET @OLD_SQL_MODE=@@SQPRIMARYL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema artdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema artdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `artdb` DEFAULT CHARACTER SET utf8 ;
USE `artdb` ;

-- -----------------------------------------------------
-- Table `artdb`.`Artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artdb`.`Artist` (
  `ConstituentId` INT NOT NULL,
  `DisplayName` VARCHAR(255) NULL,
  `ArtistBio` VARCHAR(255) NULL,
  `Nationality` VARCHAR(255) NULL,
  `Gender` BIT(1) NULL,
  `BeginDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `WikiQid` VARCHAR(60) NULL,
  `Ulan` DOUBLE NULL,
  PRIMARY KEY (`ConstituentId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `artdb`.`Artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artdb`.`Artwork` (
  `ArtworkId` INT NOT NULL,
  `Title` VARCHAR(255) NOT NULL,
  `Artist` VARCHAR(255) NULL,
  `ConstituentId` INT NULL,
  `ArtistBio` VARCHAR(255) NULL,
  `Nationality` VARCHAR(255) NULL,
  `BeginDate` DATETIME NULL,
  `EndDate` DATETIME NULL,
  `Gender` BIT(1) NULL,
  `Date` DATETIME NULL,
  `Medium` VARCHAR(255) NULL,
  `Dimensions` VARCHAR(255) NULL,
  `CreditLine` VARCHAR(255) NULL,
  `AccessionNumber` FLOAT NULL,
  `Classification` VARCHAR(255) NULL,
  `Department` VARCHAR(255) NULL,
  `DateAcquired` DATETIME NULL,
  `SeatHeight` FLOAT NULL,
  `Catalogued` BIT(1) NULL,
  `ObjectId` INT NULL,
  `Url` VARCHAR(255) NULL,
  `ThumbnailUrl` VARCHAR(255) NULL,
  `Circumference` FLOAT NULL,
  `Depth` FLOAT NULL,
  `Diameter` FLOAT NULL,
  `Height` FLOAT NULL,
  `Length` FLOAT NULL,
  `Weight` FLOAT NULL,
  `Width` FLOAT NULL,
  `Duration` VARCHAR(45) NULL,
  `Artist_ConstituentId` INT NOT NULL,
  PRIMARY KEY (`ArtworkId`),
  INDEX `fk_Artwork_Artist_idx` (`Artist_ConstituentId` ASC) VISIBLE,
  CONSTRAINT `fk_Artwork_Artist`
    FOREIGN KEY (`Artist_ConstituentId`)
    REFERENCES `artdb`.`Artist` (`ConstituentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
