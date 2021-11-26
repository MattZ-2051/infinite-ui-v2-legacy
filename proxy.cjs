const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
http
  .createServer(function (req, res) {
    proxy.web(req, res, { target: 'https://api-dev.infiniteworld.com', changeOrigin: true });
  })
  .listen(3001);
