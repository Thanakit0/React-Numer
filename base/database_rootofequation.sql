

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
DROP TABLE IF EXISTS `rootofequation`;

CREATE TABLE `rootofequation` (
  `ID` int NOT NULL,
  `Equation` varchar(45) DEFAULT NULL,
  `Xl` int DEFAULT NULL,
  `Xr` int DEFAULT NULL,
  `X_point` int DEFAULT NULL,
  `N` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `rootofequation` WRITE;
/*!40000 ALTER TABLE `rootofequation` DISABLE KEYS */;
INSERT INTO `rootofequation` VALUES (1,'2x^3-2x-5',0,2,4,5),(2,'4/(2x-1)',0,2,4,5),(3,'x * log10(x) - 1.2',2,4,4,5),(4,'x-cos(x)',0,2,4,5),(5,'x^3+3*x^2+12*x+8',-1,2,4,5),(6,'x^3-x-1',0,2,4,5),(7,'x^3+2x^2+x-1',0,2,4,5),(8,'x^3-2x-5',0,3,4,5),(9,'x^3-x+1',-2,3,4,5),(10,'2^x-x-1.7',1,3,4,5);
/*!40000 ALTER TABLE `rootofequation` ENABLE KEYS */;
UNLOCK TABLES;


