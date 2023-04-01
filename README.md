![](https://github.com/Pawel-Albert/db-connect/blob/main/%F0%9F%92%BBnodeDB%E2%9A%99%EF%B8%8F.png)

# Small simple API for sending raw SQL queries to PostgreSQL database

## Project Description

> This project is a simple application that allows users to connect to a PostgreSQL database and send raw SQL queries via a single endpoint. In response, users receive the queried data.

> The project uses Node.js, Express, and TypeScript to create a single endpoint for handling database requests. Initially developed with JavaScript, the project was later migrated to TypeScript to improve type safety and maintainability.

> The application supports both HTTP and HTTPS (with a self-signed certificate) and uses environment variables stored in a .env file for configuration.

> The primary purpose of this project is to provide the ability to chain requests (using Postman) in situations where previous endpoint responses lacked data needed to reliably send the next Postman request.

> The secondary goal was to practice using Node.js, Express, and TypeScript to build a small, yet practical application for real-world use (also applicable to my current job).

## Installation

### Clone

- Clone this repo to your local machine using

```shell

git clone https://github.com/Pawel-Albert/db-connect.git

```

### Setup

1. Install dependencies:

```shell
$ npm install
```

2. Create a `.env` file in the root of the project directory, and add your environment variables, example:

```ini
APP_PORT=3300
SSL=TRUE
STD_TTL=10
CHECK_PERIOD=12

HOST=localhost
DB_PORT=5432
USER=postgres
PASSWORD=admin
DATABASE=dvdrental
```

3. Build the TypeScript project:

```shell
$ npm run build
```

### Running the server

To run the server, simply execute:

```shell
$ npm run start
```

This will start the server with the settings provided in the `.env` file.

> Note: To use "https" protocol, users need to generate their own SSL Certificate. After generating the required files (there are a lot of tutorials on how to do it), they need to be placed in the `certs` folder (project's root). Files that are used: Private Key "key.pem" and SSL certificate "cert.pem"

## Features and how to use

The API is accessible on the `APP_PORT` specified in the .env file - for "https" it would be `https://localhost:3300/dbConnect\*`

Basic caching implementation via "node-cache" - "stdTTL" (standard time to live) and "checkperiod" are used. If a parameter is not provided, then the default value will be set (can be changed in the code directly)

For both protocols, querying the database is done via one single object - key name "query" with a value that is of type "string" (that string is a raw SQL query).

Example was performed on the well-known "dvdrental" database, often used to learn SQL in general.

Example query:

```
{
  "query": "SELECT * FROM public.actor ORDER BY actor_id DESC"
}
```

Successful response in Postman will look like below:

![https](https://user-images.githubusercontent.com/112585950/211434775-04fce5a4-217d-4a03-943f-8f3dd31957b0.png)

> Note: When using the "https" protocol with a self-signed certificate, you'll need to deliberately allow the certificate in Postman (on initial request, it will show an error in the GUI).

## Todo

- [x] Provide better error handling
- [x] Refactor how and where app(express) code is created to be more universal
- [ ] Add more functionalities
- [x] Update README file for .env and TypeScript implementation
