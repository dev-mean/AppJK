-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 10, 2015 at 08:45 PM
-- Server version: 5.1.46
-- PHP Version: 5.4.36

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `r`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `status` varchar(20) NOT NULL,
  `type` int(10) unsigned NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2011 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_name`, `status`, `type`, `password`) VALUES
(2008, 'user-1', '1', 1, '5e8ff9bf55ba3508199d22e984129be6'),
(2009, 'user-2', '1', 1, '5e8ff9bf55ba3508199d22e984129be6'),
(2010, 'user-3', '1', 1, '5e8ff9bf55ba3508199d22e984129be6');

-- --------------------------------------------------------

--
-- Table structure for table `user_balance`
--

CREATE TABLE IF NOT EXISTS `user_balance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `balance` bigint(20) unsigned NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `user_balance`
--

INSERT INTO `user_balance` (`id`, `balance`, `user_id`) VALUES
(2, 2000, '2008'),
(3, 1000, '2009'),
(4, 3000, '2010');



--
-- Definition of table `bet_transaction`
--

DROP TABLE IF EXISTS `bet_transaction`;
CREATE TABLE `bet_transaction` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(150) NOT NULL,
  `game_id` bigint(20) unsigned NOT NULL,
  `bet_amount` bigint(20) unsigned NOT NULL,
  `final_amount` bigint(20) unsigned NOT NULL,
  `profit_loss` decimal(15,2) NOT NULL,
  `bet_string` varchar(255) NOT NULL,
  `magic_no` bigint(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;