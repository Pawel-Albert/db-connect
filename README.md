![](https://github.com/Pawel-Albert/db-connect/blob/main/%F0%9F%92%BBnodeDB%E2%9A%99%EF%B8%8F.png)

# Small simple API for sending raw SQL queries to PostgreSQL database

## Project Description

> Project is a simple application that allow user to connect to database and send raw queries via single endpoint, in response user receives queried data.

> In project as addition to node js, express was used to handle creation of single endpoint.

> Application have two files that can be run from terminal with additional arguments (credentials for database).They allow using endpoint via http and second with https(self singed cert)

> Main purpose of the project is to provide ability to chain requests (using Postman) in situations that previous endpoints responses lacked data that was needed to reliably send next Postman request.
> The second goal was to practice using node js and express and build something small but applicable to my current job.

> Disclaimer: This design is simple and serves a clearly defined purpose. For this reason, the code is not DRY and may have some errors/simplifications.

## Installation

### Clone

- Clone this repo to your local machine using

```shell
git clone https://github.com/Pawel-Albert/db-connect.git
```

### Setup

- Type in terminal

```shell
$ npm instal
```

> To run "http" version of the API you can now run the code in terminal using comand:

```shell
$ node db.js "host" "port" "user" "password" "database"
```

> example with real arguments would look like:

```shell
$ node db.js localhost 5432 postgres admin dvdrental
```

> To run "https" version of the API you can now run the code in terminal using comand\*:

```shell
$ node dbSSL.js "host" "port" "user" "password" "database"
```

> example with real arguments would look like:

```shell
$ node dbSSL.js localhost 5432 postgres admin dvdrental
```

> \*To use "https" protocol user needs to generate own SSL Certificate. After generating needed files (there are lot of toturials how to do it), they need yo be placed in certs folder(projects root). Files that are used: Private Key "key.pem" and SSL certificate "cert.pem"

## Features and how to use

API is accessable on localhost and port 3300 - for "https" it would be https://localhost:3300/dbConnect\*

Basic caching implementation via "node-cache" - "stdTTL" (standard time to live) and "checkperiod" where used

For both protocols querying to database is done via one single object - key name "query" with a value that is type "string" (that string is raw SQL query).
Example was performed on well known "dvdrental" database, often used to learn SQL in general.

```
{
    "query": "SELECT * FROM public.actor ORDER BY actor_id DESC"
}
```

Successful response in Postman will look like below:
![https](https://user-images.githubusercontent.com/112585950/211434775-04fce5a4-217d-4a03-943f-8f3dd31957b0.png)

> \*Please note that we need to deliberately allow our self signed certificate in Postman (on initial request it will throw error in the GUI)

## Todo

- [ ] Provide better error handling
