const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Ruta de proxy para el primer servidor de backend
  app.use(
    "/api",
    createProxyMiddleware({
      //target: process.env.REACT_APP_API_BASE_URL_DESARROLLO,
      target: process.env.REACT_APP_API_BASE_URL_PRODUCCION,  // URL del primer servidor de backend
      changeOrigin: true,
    })
  );

  //   // Ruta de proxy para el segundo servidor de backend
};
