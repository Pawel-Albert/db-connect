const { Client } = require("pg");

async function conectToDatabaseClient(req, res) {
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
  if (
    req.body.query.toUpperCase().includes("DROP DATABASE") ||
    req.body.query.toUpperCase().includes("DROP TABLE")
  ) {
    res.status(400).json({
      errorMessage: `Did you just tried to 'DROP' that database or table? We don't do that here.`,
    });
    return;
  }

  try {
    const results = await client.query(req.body.query);
    res.send(results.rows);
  } catch (error) {
    // Whole error handling could be cleaner - should refactor if it will grow more then 2-3 exceptions.
    console.log(error);
    if (error.code === "42601") {
      res.status(400).json({
        errorMessage: `Syntax error at or near postion: ${error.position} of the requested SQL query`,
      });
      return;
    }
    if (error.code === "42703") {
      res.status(400).json({
        errorMessage: `Error: ${error.routine}.${
          error.hint
            ? " " + error.hint
            : " Wrong column name at position " + error.position
        }`,
      });
      return;
    }
    if (error.code === "42P01") {
      res.status(400).json({
        errorMessage: `Error: Provieded relation (table) at position ${error.position} does not exist`,
      });
      return;
    }
    res.status(400).json({
      errorMessage: `Your query ended with error code: ${
        error.code ? error.code : "unknown error"
      }`,
    });

    await client.end();
  }
}
module.exports = { conectToDatabaseClient };
