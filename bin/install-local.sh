#!/usr/bin/env sh


env_path=config/app.env
yml_path=config/app.yml

default_db_url="mongodb://localhost:27017/mass-labeling"
default_port=80


read -p "Enter MongoDB URL ($default_db_url): " db_url
db_url="${db_url:-$default_db_url}"
read -p "Enter server port ($default_port): " port
port="${port:-$default_port}"
read -p "Enter cookie secret: " cookie_secret
echo ""


echo "Save $env_path"
: > "$env_path"
echo "DB_URL=$db_url" >> "$env_path"
echo "PORT=$port" >> "$env_path"


echo "Save $yml_path"
: > "$yml_path"
echo "passport:"                >> "$yml_path"
echo "  secret: $cookie_secret" >> "$yml_path"

node ./config/updateConfig.js "$db_url" "$cookie_secret"

mkdir logs

echo "If you are using Mass Labeling for a first time, please, read the user guide in the docs folder."
