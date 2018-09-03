# Installation guide

There are two possible ways to install __Mass Labeling__: 

* [with Docker](#installing-with-docker) (recommended)
* [local](#installing-locally) 

## Deploy with Docker

### Prerequisites

* `Docker CE` v18
* `docker-compose` v1.20

### Preparation

Take the following steps to build __Mass Labeling__ through [Docker](https://docker.com/):

1. Clone the repository and change the folder using the following commands:
    ```sh
    git clone https://github.com/ukitgroup/mass-labeling.git
    cd mass-labelling
    ```
1. Run the install script and follow its instructions:
    ```sh
    ./bin/install.sh
    ```
    The installation process will ask you to provide the following information:
    - Docker container name
    - MongoDB location
    - HTTP port for __Mass Labeling__ service access
    - cookie secret to sign each user session ID
    
    As a result, this script generates two files: `config/app.yml` and `docker-compose.yml`. 

### Run

To run the container, use the following command:
```sh
docker-compose up -d --build
```
__*Note*__. Running container will start the __Mass Labelling__ server application.


## Delpoy locally

### Prerequisites

* `Node.js` v9.10
* `MongoDB` v3.6

### Preparation

Take the following steps to build __Mass Labeling__ locally:

1. Clone the repository and change the folder using the following commands:
    ```sh
    git clone https://github.com/ukitgroup/mass-labeling.git
    cd mass-labelling
    ```
1. Run install the script and follow its instructions:
    ```sh
    ./bin/install.sh
    ```
    The installation process will ask you to provide the following information:
    - MongoDB URI
    - HTTP port for __Mass Labeling__ service access
    - cookie secret to sign each user session ID
    
    As a result, this script generates two files: `config/app.yml` and `config/app.env`. 

1. Install the npm modules required using the following command:

    ```sh
    npm i --no-save
    ```

1. Build front-end bundles using the following command:
    ```sh
    npm run build:front
    ```

### Run

To run the __Mass Labeling__ server application, use the following command:

```sh
npm start
```

## Post install

After the installation, the system necessary to create the first administrator. This step is obligatory. 
Read the [cli user guide](cli/user) on how to do it.

English is a default language for the system but __Mass Labeling__ has multilanguage support. If someone wishes to
add one more language into web-interface then read the [multilanguage](multilanguage) on how to do it. 

## FAQ

Q: What OS are supported?  
A: The installation process with and without Docker was tested on Ubuntu 16.04 LTS and macOS 10.13.

Q: Can I use another version for `Node.js` or `MongoDB`?  
A: The mentioned versions were tested. It is possible that it will work with `Node.js` v8.6+ and `MongoDB` v3.2+. But you 
should use them on your own.

Q: How to update a working copy of __Mass Labeling__?  
A: If your working copy uses sources from master branch then it is better to make reinstall. If your working copy uses 
sources from develop branch or other then it may be enough to recompose docker image or something similar.  
