#!/bin/bash
# A script for setting up the MariaDB UMBC IEEE database.

# Get user input for the password:
read -sp "Enter MariaDB SQL password: " rootpasswd

# Indicate that bash script execution is starting:
echo $'\nExecuting script...'

# Execute commands here:
#########################################

# Drop any existing structure:
echo Removing any existing structures...
mysql -u root -p${rootpasswd} -e "DROP DATABASE IF EXISTS umbc_ieee_members;"

# Create the database + tables:
echo Creating database...
mysql -u root -p${rootpasswd} -e "CREATE DATABASE umbc_ieee_members;"

echo Creating tables...
mysql -u root -p${rootpasswd} umbc_ieee_members -e \
  "CREATE TABLE Members ( \
    ID int NOT NULL AUTO_INCREMENT, \
    LastName varchar(255) NOT NULL, \
    FirstName varchar(255) NOT NULL, \
    Email varchar(255) NOT NULL, \
    PRIMARY KEY (ID) \
  );"

mysql -u root -p${rootpasswd} umbc_ieee_members -e \
  "CREATE TABLE Attendance ( \
    ID int NOT NULL AUTO_INCREMENT, \
    MemberID int NOT NULL, \
    Date DATE NOT NULL, \
    PRIMARY KEY (ID), \
    FOREIGN KEY (MemberID) REFERENCES Members(ID) \
  );"

mysql -u root -p${rootpasswd} umbc_ieee_members -e \
  "CREATE TABLE Users ( \
    ID int NOT NULL AUTO_INCREMENT, \
    Username varchar(255) NOT NULL, \
    Password varchar(255) NOT NULL, \
    PRIMARY KEY (ID) \
  );"

echo Done!
