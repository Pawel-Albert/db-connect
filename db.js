const express = require("express");
const app = express();
const { Client } = require("pg");

const PORT = 3300;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("Sever is now listening at port ${PORT}");
});

app.get("/users", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const client = new Client(req.query);

  client.connect();
  client.query(req.body.query, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});
