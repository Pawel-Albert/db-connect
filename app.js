const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const dbController = require('./controlers/db_connect.controller.js');
const app = express();
const options = {
  key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem'))
};

const bodyParser = require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.get('/dbConnect', dbController.conectToDatabaseClient);

module.exports = {app, options};
