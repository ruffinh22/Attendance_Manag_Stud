#!/bin/bash

echo "Mise à jour du système..."

# Mettre à jour le système
apt update && apt upgrade -y

# Installer les dépendances nécessaires pour MySQL et Python
echo "Installation des dépendances pour MySQL et Python..."
apt install python3-dev default-libmysqlclient-dev build-essential -y

# Installer MySQL
echo "Installation de MySQL..."
apt install mysql-server -y

# Sécuriser l'installation de MySQL
echo "Sécurisation de MySQL..."
mysql_secure_installation

# Créer la base de données et l'utilisateur MySQL
echo "Configuration de MySQL..."
mysql -u root -p <<MYSQL_SCRIPT
CREATE DATABASE attendance;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Admin123123@';
GRANT ALL PRIVILEGES ON attendance.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT

# Installer MongoDB
echo "Installation de MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt update
apt install -y mongodb-org

# Démarrer MongoDB
echo "Démarrage de MongoDB..."
systemctl start mongod
systemctl enable mongod

# Configurer MongoDB
echo "Configuration de MongoDB..."
mongo <<MONGO_SCRIPT
use admin
db.createUser({
  user: 'admin1',
  pwd: 'admin123',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
})
use attendance
db.createUser({
  user: 'admin1',
  pwd: 'admin123',
  roles: [{ role: 'readWrite', db: 'attendance' }]
})
MONGO_SCRIPT

# Installer Python et pip
echo "Installation de Python et pip..."
apt install python3 python3-pip -y

# Installer les dépendances Python
echo "Installation des dépendances Python..."
pip3 install -r requirements.txt

# Appliquer les migrations Django
echo "Application des migrations Django..."
python3 manage.py migrate

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python3 manage.py collectstatic --noinput

echo "Installation et configuration terminées !"
