#!/usr/bin/env sh


docker_compose_path=docker-compose.yml

default_container="mass-labeling"
default_db_table="mass-labeling"
default_port=80

docker_use_mongo=false

read -p "Enter container name ($default_container): " container

# If container name contains only whitespaces or is empty,
# set default container name instead
case $container in
  (*[![:blank:]]*) ;;
  ("") container=$default_container;;
  (*) container=$default_container
esac

echo ""

echo "Choose MongoDB type:"
echo "  1. Docker"
echo "  2. Local"
read -p "> " db_type
echo ""

case "$db_type" in
  "1")
    read -p "Enter MongoDB table name ($default_db_table): " db_table
    db_table="${db_table:-$default_db_table}"
    docker_use_mongo=true
    ;;

  "2")
    read -p "Enter MongoDB URL: " db_url
    ;;

  *)
    echo "Bad MongoDB type"
    exit
    ;;
esac

read -p "Enter server port for service (default=$default_port): " port
port="${port:-$default_port}"
read -p "Enter cookie secret: " cookie_secret
echo ""

echo "Save $docker_compose_path"
: > "$docker_compose_path"
                        echo "version: '2'"                                       >> "$docker_compose_path"
                        echo ""                                                   >> "$docker_compose_path"
                        echo "services:"                                          >> "$docker_compose_path"
                        echo "  $container:"                                      >> "$docker_compose_path"
                        echo "    container_name: $container"                     >> "$docker_compose_path"
                        echo "    build: ."                                       >> "$docker_compose_path"
                        echo "    environment:"                                   >> "$docker_compose_path"
                        echo "      NODE_ENV: production"                         >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "      DB_URL: mongodb://mongo:27017/$db_table"      >> "$docker_compose_path"
"$docker_use_mongo" ||  echo "      DB_URL: $db_url"                              >> "$docker_compose_path"
                        echo "      PORT: 80"                                     >> "$docker_compose_path"
                        echo "    volumes:"                                       >> "$docker_compose_path"
                        echo "    - ./data:/usr/bin/app/data"                     >> "$docker_compose_path"
                        echo "    - ./logs:/usr/bin/app/logs"                     >> "$docker_compose_path"
                        echo "    ports:"                                         >> "$docker_compose_path"
                        echo "    - $port:80"                                     >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    depends_on:"                                    >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    - mongo"                                        >> "$docker_compose_path"
                        echo "    command: sh -c 'npm start'"                     >> "$docker_compose_path"
                        echo "    restart: always"                                >> "$docker_compose_path"
"$docker_use_mongo" &&  echo ""                                                   >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "  mongo:"                                           >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    container_name: ${container}_mongo"             >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    image: mongo:3.6"                               >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    volumes:"                                       >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    - ./data/mongo:/data/db"                        >> "$docker_compose_path"
"$docker_use_mongo" &&  echo "    restart: always"                                >> "$docker_compose_path"

dbURL=""

if [ "$docker_use_mongo" = true ];
  then dbURL="mongodb://mongo:27017/$db_table";
  else dbURL="$db_url";
fi

cp ./config/config-template.json ./config/config.json

# Always set 80th port for docker container
node ./config/updateConfig.js "$dbURL" "$cookie_secret" "80"

mkdir -p logs

echo "If you are using Mass Labeling for a first time, please, read the user guide in the docs folder."
