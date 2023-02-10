import {Client} from 'pg';
import NodeCache from 'node-cache';

const STANDARD_TIME_TO_LIVE: number = Number(process.env.STD_TLL) || 1;
const CHECK_PERIOD: number = Number(process.env.CHECK_PERIOD) || 2;
const myCache = new NodeCache({stdTTL: STANDARD_TIME_TO_LIVE, checkperiod: CHECK_PERIOD});

export async function createNewPostgresClient(
  host: string,
  port: any,
  user: string,
  password: string,
  database: string
) {
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

interface DbClientData {
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  database?: string;
}

export const DB_CLIENT_DATA: DbClientData = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

export async function runQuery(client: any, query: string) {
  const cachedResult = await myCache.get(query);
  if (cachedResult) {
    return cachedResult;
  }

  const results = await client.query(query);
  myCache.set(query, results);
  return results;
}
