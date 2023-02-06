const {
  errorHandler,
  validateQuery
} = require('../postgresSQL_config/postsgreSQL_errors.js');
const {
  createNewPostgresClient,
  DB_CLIENT_DATA,
  runQuery
} = require('../postgresSQL_config/posgreSQL_client');

async function conectToDatabaseClient(req, res) {
  const query = req.body.query;
  if (!validateQuery(query, res)) {
    return;
  }
  let client;
  // Client is defined outside the try/catch block, as when the catch block was executed
  // Connections to database where not being terminated properly, leading to unwanted behaviour
  try {
    client = await createNewPostgresClient(
      DB_CLIENT_DATA.host,
      DB_CLIENT_DATA.port,
      DB_CLIENT_DATA.user,
      DB_CLIENT_DATA.password,
      DB_CLIENT_DATA.database
    );
    const result = await runQuery(client, query);
    res.send(result.rows);
    client.end();
  } catch (error) {
    await errorHandler(error, res);
    if (client) {
      client.end();
    }
  }
}

module.exports = {conectToDatabaseClient};
