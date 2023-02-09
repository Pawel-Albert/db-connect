import https from 'https';
import http from 'http';
import {arrayExtractValue} from './utylis/helper.js';
import {app, options} from './app';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

const server = arrayExtractValue(process.argv, 'SSL')
  ? https.createServer(options, app)
  : http.createServer(app);
const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
