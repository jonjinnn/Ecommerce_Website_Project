DROP DATABASE IF EXISTS phonedb;
CREATE DATABASE phonedb;
GO
USE phonedb;
GO

CREATE TABLE phones (
    id VARCHAR(10) NOT NULL,
    model VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    memory VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(100) NOT NULL,
    PRIMARY KEY(id));

CREATE TABLE creditcards ( 
    id VARCHAR(20) NOT NULL, 
    name VARCHAR(50) NOT NULL,  
    expiration DATE NOT NULL, 
    PRIMARY KEY(id));

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    ccId VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(ccId) REFERENCES creditcards(id));

 CREATE TABLE sales (
    id INT NOT NULL AUTO_INCREMENT, 
    customerEmail VARCHAR(50) NOT NULL, 
    phoneId VARCHAR(10) NOT NULL, 
    qty INT NOT NULL,
    saleDate DATE NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY(phoneId) REFERENCES phones(id)); 
    

 CREATE TABLE ratings (
    phoneId VARCHAR(10) NOT NULL, 
    rating FlOAT NOT NULL, 
    numVotes INT NOT NULL, 
    FOREIGN KEY(phoneId) REFERENCES phones(id));

 CREATE TABLE taxRates (
    zipCode VARCHAR(5) NOT NULL,
    state VARCHAR(2) NOT NULL,
    tax FLOAT NOT NULL,
    PRIMARY KEY (zipCode));
    
 CREATE TABLE zipCodes (
    zipCode VARCHAR(5) NOT NULL,
    state VARCHAR(2) NOT NULL,
    state VARCHAR(20) NOT NULL,
    PRIMARY KEY (zipCode));
 
mysql --local-infile=1 -u mytestuser -p
use phonedb;
LOAD DATA LOCAL INFILE 'tax_rates2.csv' INTO TABLE taxRates FIELDS TERMINATED BY ','
ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (zipCode, state, tax);




