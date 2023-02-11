import {Client, ClientConfig} from 'pg';
import NodeCache from 'node-cache';

const STANDARD_TIME_TO_LIVE = Number(process.env.STD_TLL) || 1;
const CHECK_PERIOD = Number(process.env.CHECK_PERIOD) || 2;
const myCache = new NodeCache({stdTTL: STANDARD_TIME_TO_LIVE, checkperiod: CHECK_PERIOD});

interface DbClientConfig extends ClientConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
export interface QueryResult {
  rows: any[];
}

export async function createNewPostgresClient(config: DbClientConfig): Promise<Client> {
  const client = new Client(config);
  await client.connect();
  return client;
}

export const DB_CLIENT_CONFIG: DbClientConfig = {
  host: process.env.HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  user: process.env.USER || '',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || ''
};

export async function runQuery(client: Client, query: string): Promise<QueryResult> {
  const cachedResult = await myCache.get(query);
  if (cachedResult && isQueryResult(cachedResult)) {
    return cachedResult;
  }

  const results = await client.query(query);
  myCache.set(query, results);
  return results;
}

function isQueryResult(result: any): result is QueryResult {
  return result && Array.isArray(result.rows);
}
