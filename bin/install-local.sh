#!/usr/bin/env sh


default_db_url="mongodb://localhost:27017/mass-labeling"
default_port=80


read -p "Enter MongoDB URL ($default_db_url): " db_url
db_url="${db_url:-$default_db_url}"
read -p "Enter server port ($default_port): " port
port="${port:-$default_port}"
read -p "Enter cookie secret: " cookie_secret
echo ""

cp ./config/config-template.json ./config/config.json

node ./config/updateConfig.js "$db_url" "$cookie_secret" "$port"

mkdir -p logs

echo "If you are using Mass Labeling for a first time, please, read the user guide in the docs folder."
