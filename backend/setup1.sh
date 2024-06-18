# Installer Python et pip
echo "Installation de Python et pip..."
apt install python3 python3-pip -y

# Installer mysqlclient
echo "Installation de mysqlclient..."
apt install python3-dev default-libmysqlclient-dev -y
pip3 install mysqlclient
