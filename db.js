const express = require("express");
const app = express();
const { Client } = require("pg");

const PORT = 3300;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});

app.get("/dbConnect", async (req, res) => {
  try {
    const client = new Client(req.body.client);
    await client.connect();
    const results = await client.query(req.body.query);
    res.send(results.rows);
    await client.end();
  } catch (error) {
    console.log(error);
  }
});
