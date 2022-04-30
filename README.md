# Sample Customer/Order CRUD application
#### Arye Friedman / arye.friedman@gmail.com

## Technologies implemented / used
* Node.js
* Next.js
* React
* Knex (with pagination plugin)
* Typescript
* Volta (for easier node/yarn version management during development)
* Postgresql with PostGIS
* Python (for data migration)
* Docker (Postgres and Node.js containerization)
* Postman + newman for api testing /unit testing

# Architecture

* 3-tier application on server side (data layer, business layer, web api/REST)
* 2-tier on client side (presentation layer - tsx/jsx, api/data layer)
  * SASS + styled-components for styling
  * Local Storage for data persistence
  * hookstate for state management (TODO)
  * react-table for data presentation


## Environment
* Windows 10 with WSL2 & Docker Desktop 
* Webstorm IDE
* DBeaver Data Studio (optional)
* Pycharm IDE
* Containerized Postgresql with PostGis (for optional reverse geocoding) as backend db

## Bootstrap
  * Pull image docker.io/aryef/postgres_14.0.0_postgis_3.1.4_alpine_3.14
  * Run script  ../containers/pg_docker_run.sh to run PG container on port 45432
  * use admin user/password justtuser/justtmasterpwd to connect to db to inspect data and create data objects 
  * run scripts in ../scripts/db/postgres subdirectories to create db objects
  * use npm/yarn to install dependencies

## Runtime
  * Dockerize the application using Dockerfile in the root directory

## Project structure

### ./containers
* includes script for loading PG server container 

### ./docs

* project specs
* dev environment instructions

### ./scripts

* db - create project db, users, schema and helpers scripts
* launchers - script to launch browsers configured for development and testing
* migration - Python scripts for data migration to PG from input json data

### ./src/webserver
* Next.js based web application
### ./tests
* Postman collection file for api testing (newman can be used to launch it with script)

## TODOS (of course it is a quite partial list wha can be done more )
* user authentication 
* user session management
* API protection (like with Bearer Token etc.)
* SSL/HTTPS
* input data sanitation
* PUT order (order modification)
* fully ensure integrity of data input && transactions management (foreign keys etc)
* sensitive data end-to-end encryption
* use docker-compose to wrap up everything
* logs delivery to a central log service

