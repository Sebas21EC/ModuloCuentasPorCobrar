const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Ruta de proxy para el primer servidor de backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5126',  // URL del primer servidor de backend
      changeOrigin: true,
    })
  );

//   // Ruta de proxy para el segundo servidor de backend
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://localhost:7275/',  // URL del segundo servidor de backend
//       changeOrigin: true,
//     })
//   );
};
