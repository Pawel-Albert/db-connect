const express = require('express');
const bodyParser = require('body-parser');

const dbController = require('./controlers/db_connect.controller.js');
const app = express();
const PORT = 3300;

app.use(bodyParser.json());

app.get('/dbConnect', dbController.conectToDatabaseClient);

app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
