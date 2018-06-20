# Installation guide

There are two possible ways to install __Mass Labeling__. They are 

* [with Docker](#installing-with-docker) (recommended)
* [local](#installing-locally) 

## Deploy with Docker

### Prerequisites

* `Docker CE` v18
* `docker-compose` v1.20

### Preparation

Take the following steps to build __Mass Labeling__ through [Docker](https://docker.com/):

1. Clone the repository and change folder using the following commands:
    ```sh
    git clone https://github.com/ukitgroup/mass-labeling.git
    cd mass-labelling
    ```
1. Run install script and it will guide you:
    ```sh
    ./bin/install.sh
    ```
    Install process demands to provide the following information:
    - MongoDB location
    - Docker container name
    - HTTP port for __Mass Labeling__ service access
    - cookie secret to sign each user session ID
    
    As a result this script generates two files: `config/app.yml` and `docker-compose.yml`. 

### Run

To run container use the following command:
```sh
docker-compose up -d --build
```
__*Note*__. Running container will start __Mass Labelling__ server application.


## Delpoy locally

### Prerequisites

* `Node.js` v9.10
* `MongoDB` v3.6

### Preparation

Take the following steps to build __Mass Labeling__ locally:

1. Clone the repository and change folder using the following commands:
    ```sh
    git clone https://github.com/ukitgroup/mass-labeling.git
    cd mass-labelling
    ```
1. Run install script and it will guide you:
    ```sh
    ./bin/install.sh
    ```
    Install process demands to provide the following information:
    - MongoDB URI
    - HTTP port for __Mass Labeling__ service access
    - cookie secret to sign each user session ID
    
    As a result this script generates two files: `config/app.yml` and `config/app.env`. 

1. Install required npm modules using the following command:

```sh
npm i --no-save
```

### Run

To run __Mass Labeling__ server application use the following command:

```sh
npm start
```

## Post install

After installation system requires to have first administrator created. Read the [user guide](user_guide) about this 
obligatory step.

## FAQ

Q: What OS-s are supported?  
A: Installation process with and without Docker was tested on Ubuntu 16.04 LTS and macOS 10.13.

Q: Could I use another version for `Node.js` or `MongoDB`?  
A: Mention versions were tested. It is possible that it will work with `Node.js` v8.6+ and `MongoDB` v3.2+. But you 
should use them on your own.
