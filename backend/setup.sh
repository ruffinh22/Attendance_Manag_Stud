#!/bin/bash

# Fonction pour vérifier le code de sortie de la dernière commande et arrêter le script en cas d'erreur
check_error() {
  if [ $? -ne 0 ]; then
    echo "Erreur détectée. Arrêt du script."
    exit 0
  fi
}

# Mettre à jour les paquets et installer Python et pip
echo "Mise à jour des paquets et installation de Python et pip..."

# Installer les dépendances pour psycopg2 (PostgreSQL)
echo "Installation des dépendances pour psycopg2..."
apt install -y python-dev libpq-dev
check_error

# Installer psycopg2
echo "Installation de psycopg2..."
pip install psycopg2-binary
check_error

# Installer PostgreSQL
echo "Installation de PostgreSQL..."
apt install -y postgresql postgresql-contrib
check_error

# Configurer PostgreSQL


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
pip install -r requirements.txt
check_error

# Appliquer les migrations Django
echo "Application des migrations Django..."
python manage.py migrate
check_error

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput
check_error

# Démarrer le serveur Django
echo "Démarrage du serveur Django..."
python3 manage.py runserver 0.0.0.0:8000
check_error

echo "Installation et configuration terminées !"
