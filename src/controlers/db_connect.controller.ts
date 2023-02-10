import {Request, Response} from 'express';
import {errorHandler, validateQuery} from '../postgresSQL_config/postsgreSQL_errors.js';
import {
  createNewPostgresClient,
  DB_CLIENT_DATA,
  runQuery
} from '../postgresSQL_config/posgreSQL_client';

export async function conectToDatabaseClient(req: Request, res: Response) {
  const query = req.body.query;
  if (!validateQuery(query, res)) {
    return;
  }
  let client: any;
  try {
    const host = typeof DB_CLIENT_DATA.host === 'string' ? DB_CLIENT_DATA.host : '';
    const port = typeof DB_CLIENT_DATA.port === 'string' ? DB_CLIENT_DATA.port : '';
    const user = typeof DB_CLIENT_DATA.user === 'string' ? DB_CLIENT_DATA.user : '';
    const password =
      typeof DB_CLIENT_DATA.password === 'string' ? DB_CLIENT_DATA.password : '';
    const database =
      typeof DB_CLIENT_DATA.database === 'string' ? DB_CLIENT_DATA.database : '';
    client = await createNewPostgresClient(host, port, user, password, database);
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
