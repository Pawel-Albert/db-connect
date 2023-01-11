const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const dbController = require("./controlers/db_connect.controller.js");
const app = express();
const options = {
  key: fs.readFileSync(path.join(__dirname, "./certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certs/cert.pem")),
};
const sslserver = https.createServer(options, app);
const PORT = 3300;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/dbConnect", dbController.conectToDatabaseClient);

sslserver.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
