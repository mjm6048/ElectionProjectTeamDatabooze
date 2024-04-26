#!/bin/bash

# Define the name of your SQL script file
sql_script="InsertSocietyData.sql"

# Use sed to remove the societyID column and the first value from the VALUES clause
sed -i "s/INSERT INTO society ([^)]*) VALUES ([^,]*, /INSERT INTO society (societyName, societyDescription) VALUES (/g" "$sql_script"