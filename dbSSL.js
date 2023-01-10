const express = require("express");
const https = require("https");
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const app = express();
const options = {
  key: fs.readFileSync(path.join(__dirname, "./certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certs/cert.pem")),
};
const sslserver = https.createServer(options, app);
const PORT = 3300;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/dbConnect", async (req, res) => {
  const client = new Client({
    host: process.argv[2],
    port: process.argv[3],
    user: process.argv[4],
    password: process.argv[5],
    database: process.argv[6],
  });
  await client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
  });
  try {
    const results = await client.query(req.body.query);
    res.send(results.rows);
  } catch (error) {
    console.log(error);
  }
  await client.end();
});

sslserver.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
