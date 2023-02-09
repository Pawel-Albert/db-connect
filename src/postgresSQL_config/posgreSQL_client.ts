import {Client} from 'pg';
import NodeCache from 'node-cache';
import {arrayExtractValue} from '../utylis/helper.js';

const STANDARD_TIME_TO_LIVE = arrayExtractValue(process.argv, 'STDTTL') || 10;
const CHECK_PERIOD = arrayExtractValue(process.argv, 'CHECKPERIOD') || 12;
const myCache = new NodeCache({stdTTL: STANDARD_TIME_TO_LIVE, checkperiod: CHECK_PERIOD});

export async function createNewPostgresClient(
  host: string,
  port: number,
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

export const DB_CLIENT_DATA = {
  host: arrayExtractValue(process.argv, 'HOST'),
  port: arrayExtractValue(process.argv, 'PORT'),
  user: arrayExtractValue(process.argv, 'USER'),
  password: arrayExtractValue(process.argv, 'PASSWORD'),
  database: arrayExtractValue(process.argv, 'DATABASE')
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
