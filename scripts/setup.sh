#!/bin/bash
# A script for setting up the MariaDB UMBC IEEE database.

# Get user input for the password:
read -sp "Enter MariaDB SQL password: " rootpasswd

# Indicate that bash script execution is starting:
echo $'\nExecuting script......'

# Execute commands here:
#########################################

# Drop any existing structure:
echo Removing any existing structures......
mysql -u root -p${rootpasswd} -e "DROP DATABASE IF EXISTS umbc_ieee_members;"

# Create the database + tables:
echo Creating database......
mysql -u root -p${rootpasswd} -e "CREATE DATABASE umbc_ieee_members;"

echo Creating tables......
mysql -u root -p${rootpasswd} -e ""

mysql -u root -p${rootpasswd} -e ""

echo Done!
