const https = require('https');
const http = require('http');
const {arrayExtractValue} = require('./utylis/helper.js');
const {app, options} = require('./app');

const server = arrayExtractValue(process.argv, 'SSL')
  ? https.createServer(options, app)
  : http.createServer(app);
const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});
