# Установка


Возможны 2 варианта установки Mass Labeling:

* с использованием [Docker](https://docker.com/) (рекомендуется)
* в локальном окружении


## Docker

Рекомендуется использовать `docker-compose` со следующи конфигурационным файлом:

```yaml
version: "2"

services:
  mass-labeling:
    container_name: mass-labeling
    build: .
    env_file:
    - ./conf/app.env
    environment:
      NODE_ENV: production
      DB_URL: mongodb://mongo:27017/mass-labeling
      PORT: 80
    volumes:
    - ./conf/app.js:/usr/bin/app/conf/app.js
    - ./data:/usr/bin/app/data
    - ./log:/usr/bin/app/log
    - ./tmp:/usr/bin/app/tmp
    ports:
    - 0.0.0.0:<port>:80
    depends_on:
    - mongo
    restart: always
    
  mongo:
    container_name: mass-labeling-mongo
    image: mongo:3.6
    volumes:
    - ./data/mongo:/data/db
    restart: always
```

### Порядок установки и сборки

1. Скопировать `conf/app.default.env` в `conf/app.env`.
    1. Задать секрет для хранилища сессий в `conf/app.env`, в поле `COOKIE_SECRET`.
2. Скопировать `conf/app.default.js` в `conf/app.js`.
3. Создать конфигурационный файл `docker-compose.yml` в папке проекта.
    1. Заменить в `docker-compose.yml` `<port>` на тот порт, по которому будет доступен Mass Labeling.
4. Собрать с использованием комманды `docker-compose build`.

### Запуск

`docker-compose up`

### Примечания

* Для использования локально установленной MongoDB необходимо закомментировать/удалить сервис `mongo` и задать корректный `DB_URL`.


## Локальное окружение

### Требования

* `Node.js` версии 9.10.0
* `MongoDB` версии 3.6.3

### Порядок установки и сборки

1. Скопировать `conf/app.default.env` в `conf/app.env`.
    1. Задать путь к MongoDB `conf/app.env`, в поле `DB_URL`.
    2. Задать порт, по которому будет доступен Mass Labeling в `conf/app.env`, в поле `PORT`.
    3. Задать секрет для хранилища сессий в `conf/app.env`, в поле `COOKIE_SECRET`.
2. Скопировать `conf/app.default.js` в `conf/app.js`.
3. Установить npm-модули с использованием комманды `npm i --no-save`.

### Запуск

`npm start`
