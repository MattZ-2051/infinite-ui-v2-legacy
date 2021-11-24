const http = require('http');
const httpProxy = require('http-proxy');
const { _project: project } = require('./tsconfig.json');
require('dotenv').config({ path: `./projects/${project}/.env.development` });

const proxy = httpProxy.createProxyServer({});
http
  .createServer(function (req, res) {
    // console.log('Request', req.method, req.url);
    proxy.web(req, res, { target: process.env.VITE_API_URL, changeOrigin: true });
  })
  .listen(3001);
