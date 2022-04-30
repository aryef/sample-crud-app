# Justt Home Assignment

#### Arye Friedman / arye.friedman@gmail.com

### Sample Order/Order CRUD application

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

* 3-tier application on server side (data layer, business layer, http)
* 2-tier on client side (presentation layer - tsx/jsx, api/data layer)
* SASS + styled-components for styling
* hookstate for global state management


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

## TODOS
* user authentication 
* user session management
* API protection (like with Bearer Token etc.)
* SSL/HTTPS
* input data sanitation
* check integrity of data input && transactions management
* sensitive data end-to-end encryption
* use jest for better unit testing
* use docker-compose 
* logs delivery to a central log service

