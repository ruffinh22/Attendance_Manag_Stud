#!/bin/bash


# Installer Python et pip
echo "Installation de Python et pip..."
sudo apt update
sudo apt install -y python3 python3-pip

# Installer les dépendances pour mysqlclient
echo "Installation des dépendances pour mysqlclient..."
sudo apt install -y python3-dev default-libmysqlclient-dev build-essential

# Installer mysqlclient
echo "Installation de mysqlclient..."
pip3 install mysqlclient

# Autres étapes de configuration (MySQL, MongoDB, Django migrations, etc.)

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

# Vérifier et ajuster les permissions du socket MySQL
echo "Vérification des permissions du socket MySQL..."
chown mysql:mysql /var/run/mysqld/mysqld.sock
chmod 777 /var/run/mysqld/mysqld.sock

# Redémarrer MySQL pour appliquer les changements
echo "Redémarrage de MySQL..."
systemctl restart mysql

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
