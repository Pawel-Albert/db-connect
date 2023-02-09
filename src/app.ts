import express from 'express';
import fs from 'fs';
import path from 'path';
const morgan = require('morgan');

import {conectToDatabaseClient} from './controlers/db_connect.controller.js';
export const app = express();
export const options = {
  key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem'))
};

const bodyParser = require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.get('/dbConnect', conectToDatabaseClient);
