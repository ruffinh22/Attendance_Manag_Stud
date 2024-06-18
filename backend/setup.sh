#!/bin/bash

# Fonction pour vérifier le code de sortie de la dernière commande et arrêter le script en cas d'erreur
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

# Installer les dépendances pour psycopg2 (PostgreSQL)
echo "Installation des dépendances pour psycopg2..."
apt install -y python3-dev libpq-dev
check_error

# Installer psycopg2
echo "Installation de psycopg2..."
pip3 install psycopg2-binary
check_error

# Installer PostgreSQL
echo "Installation de PostgreSQL..."
apt install -y postgresql postgresql-contrib
check_error

# Configurer PostgreSQL
echo "Configuration de PostgreSQL..."
# Créer une base de données et un utilisateur pour Django
sudo -u postgres psql -c "CREATE DATABASE attendance_3r8v;"
sudo -u postgres psql -c "CREATE USER admin WITH PASSWORD 'wI8I8Pl3DNrFNKFrEAYC9McJjEll3Iyx';"
sudo -u postgres psql -c "ALTER ROLE admin SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE admin SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE admin SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE attendance_3r8v TO admin;"
check_error

# Vérifier et ajuster les permissions du socket PostgreSQL (si nécessaire)
# Exemple:
# chown postgres:postgres /var/run/postgresql
# chmod 775 /var/run/postgresql
# check_error

# Redémarrer PostgreSQL pour appliquer les changements
echo "Redémarrage de PostgreSQL..."
systemctl restart postgresql
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

# Démarrer le serveur Django
echo "Démarrage du serveur Django..."
python3 manage.py runserver 0.0.0.0:8000
check_error

echo "Installation et configuration terminées !"
