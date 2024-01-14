import axios from 'axios';

// Configura la URL base si es necesario
// axios.defaults.baseURL = 'http://tu-api.com';

// Agrega un interceptor de solicitud
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    console.log(token);

    // Agrega el token de autenticación al encabezado de la solicitud
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config);
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axios;
