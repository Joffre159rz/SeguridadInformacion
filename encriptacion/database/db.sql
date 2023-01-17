-- to create a new database
CREATE DATABASE encriptacion;

-- to use database
use encriptacion;

-- creating a new table
CREATE TABLE datos (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  msj VARCHAR(50) NOT NULL,
  msj_encriptado VARCHAR(100) NOT NULL,
  llave int(4) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe datos;