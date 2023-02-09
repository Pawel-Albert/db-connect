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
  } catch (error: any) {
    await errorHandler(error, res);
    if (client) {
      client.end();
    }
  }
}
