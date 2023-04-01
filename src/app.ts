import express from 'express';
import {Application} from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';
const morgan = require('morgan');
const helmet = require('helmet');

import {conectToDatabaseClient} from './controlers/db_connect.controller.js';
export const app: Application = express();
export const options: {key: Buffer; cert: Buffer} = {
  key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem'))
};
const bodyParser = require('body-parser');

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.get('/dbConnect', conectToDatabaseClient);
