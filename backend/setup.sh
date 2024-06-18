#!/bin/bash

# Fonction pour vérifier la dernière commande exécutée et arrêter le script en cas d'erreur
check_error() {
  if [ $? -ne 0 ]; then
    echo "Erreur détectée. Arrêt du script."
    exit 1
  fi
}

# Mettre à jour les paquets et installer Python et pip
echo "Mise à jour des paquets et installation de Python et pip..."
apt update && apt install -y python3 python3-pip
check_error

# Installer les dépendances pour mysqlclient
echo "Installation des dépendances pour mysqlclient..."
apt install -y python3-dev default-libmysqlclient-dev build-essential
check_error

# Installer mysqlclient
echo "Installation de mysqlclient..."
pip3 install mysqlclient
check_error

# Installer MySQL
echo "Installation de MySQL..."
apt install -y mysql-server
check_error

# Sécuriser l'installation de MySQL
echo "Sécurisation de MySQL..."
mysql_secure_installation
check_error

# Créer la base de données et l'utilisateur MySQL
echo "Configuration de MySQL..."
mysql -u root -p <<MYSQL_SCRIPT
CREATE DATABASE attendance;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Admin123123@';
GRANT ALL PRIVILEGES ON attendance.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT
check_error

# Vérifier et ajuster les permissions du socket MySQL
echo "Vérification des permissions du socket MySQL..."
chown mysql:mysql /var/run/mysqld/mysqld.sock
chmod 777 /var/run/mysqld/mysqld.sock
check_error

# Redémarrer MySQL pour appliquer les changements
echo "Redémarrage de MySQL..."
systemctl restart mysql
check_error

# Installer MongoDB
echo "Installation de MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt update
apt install -y mongodb-org
check_error

# Démarrer MongoDB
echo "Démarrage de MongoDB..."
systemctl start mongod
systemctl enable mongod
check_error

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
check_error

# Installer les dépendances Python
echo "Installation des dépendances Python..."
pip3 install -r requirements.txt
check_error

# Appliquer les migrations Django
echo "Application des migrations Django..."
python3 manage.py migrate
check_error

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python3 manage.py collectstatic --noinput
check_error

echo "Installation et configuration terminées !"
