import {Request, Response} from 'express';
import {errorHandler, validateQuery} from '../postgresSQL_config/postsgreSQL_errors.js';
import {
  createNewPostgresClient,
  DB_CLIENT_CONFIG,
  runQuery
} from '../postgresSQL_config/posgreSQL_client';
import {Client} from 'pg';
let client: Client;

export async function conectToDatabaseClient(req: Request, res: Response) {
  const query = req.body.query;
  if (!validateQuery(query, res)) {
    return;
  }
  try {
    client = await createNewPostgresClient(DB_CLIENT_CONFIG);
    const result = await runQuery(client, query);

    res.send(result.rows);
    client.end();
  } catch (error: any) {
    await errorHandler(error, res);
    if (client) {
      client.end();
    }
  }
}
