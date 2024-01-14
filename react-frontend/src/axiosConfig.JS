// axiosConfig.js
import axios from 'axios';

const instance = axios.create();

// Configurar Axios para que adjunte el token en cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Obtener el token del almacenamiento de sesión
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
