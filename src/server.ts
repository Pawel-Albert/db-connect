import * as dotenv from 'dotenv';
dotenv.config();
import https from 'https';
import http from 'http';
import {app, options} from './app';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

const server: http.Server | https.Server = process.env.SSL
  ? https.createServer(options, app)
  : http.createServer(app);
const PORT: number = Number(process.env.APP_PORT) || 3300;

server.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
