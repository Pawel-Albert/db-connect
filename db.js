const express = require("express");
const app = express();
const { Client } = require("pg");

console.log(process.argv[2]);
const PORT = 3300;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
app.get("/dbConnect", async (req, res) => {
  const client = new Client({
    host: process.argv[2],
    port: Number(process.argv[3]),
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
