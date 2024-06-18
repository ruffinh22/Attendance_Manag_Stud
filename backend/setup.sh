#!/bin/bash

# Fonction pour vérifier le code de sortie de la dernière commande et arrêter le script en cas d'erreur


# Vérifier les privilèges root
if [ "$(id -u)" -ne 0 ]; then
  echo "Ce script doit être exécuté en tant que root."
  exit 1
fi

# Mettre à jour les paquets et installer Python et pip
echo "Mise à jour des paquets et installation de Python et pip..."
apt update
check_error
apt install -y python3 python3-pip

# Installer les dépendances pour psycopg2 (PostgreSQL)
echo "Installation des dépendances pour psycopg2..."
apt install -y python3-dev libpq-dev
check_error

# Installer psycopg2
echo "Installation de psycopg2..."
pip3 install psycopg2-binary


# Installer PostgreSQL
echo "Installation de PostgreSQL..."
apt install -y postgresql postgresql-contrib


# Configurer PostgreSQL
# Ici, vous pouvez ajouter des configurations spécifiques à PostgreSQL si nécessaire.

# Redémarrer PostgreSQL pour appliquer les changements
echo "Redémarrage de PostgreSQL..."
systemctl restart postgresql


# Installer les dépendances Python de votre projet
echo "Installation des dépendances Python..."
pip3 install -r requirements.txt

# Appliquer les migrations Django
echo "Application des migrations Django..."
python3 manage.py migrate


# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python3 manage.py collectstatic --noinput

# Démarrer le serveur Django
echo "Démarrage du serveur Django..."
python3 manage.py runserver 0.0.0.0:8000


echo "Installation et configuration terminées avec succès !"
