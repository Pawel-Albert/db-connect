const {Client} = require('pg');
const NodeCache = require('node-cache');

const myCache = new NodeCache({stdTTL: 10, checkperiod: 12});

async function createNewPostgresClient(host, port, user, password, database) {
  const client = new Client({
    host,
    port,
    user,
    password,
    database
  });
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve(client);
    });
  });
}

const DB_CLIENT_DATA = {
  host: process.argv[2],
  port: process.argv[3],
  user: process.argv[4],
  password: process.argv[5],
  database: process.argv[6]
};

async function runQuery(client, query) {
  const cachedResult = await myCache.get(query);
  if (cachedResult) {
    return cachedResult;
  }

  const results = await client.query(query);
  myCache.set(query, results);
  return results;
}
module.exports = {createNewPostgresClient, DB_CLIENT_DATA, runQuery};
