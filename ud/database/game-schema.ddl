CREATE DATABASE IF NOT EXISTS r;
USE r;

DROP TABLE IF EXISTS `r`.`user`;
CREATE TABLE  `r`.`user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `status` varchar(20) NOT NULL,
  `type` int(10) unsigned NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2008 DEFAULT CHARSET=latin1;




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