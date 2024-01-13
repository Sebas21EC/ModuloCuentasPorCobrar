const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Ruta de proxy para el primer servidor de backend
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://localhost:5126',
     target: 'http://sebas159-001-site1.htempurl.com',  // URL del primer servidor de backend
      //target: 'https://accountsreceviablemodule.azurewebsites.net',  // URL del primer servidor de backend
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
