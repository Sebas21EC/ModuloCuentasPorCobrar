// IPContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const IPContext = createContext();

export const IPProvider = ({ children }) => {
  const [clientIP, setClientIP] = useState('');

  useEffect(() => {
    const fetchClientIP = async () => {
      try {
        // Usa el endpoint específico para IPv4 proporcionado por seeip.org
        const response = await axios.get('https://ipv4.seeip.org/jsonip');
        // Asegúrate de acceder a la propiedad correcta donde la API devuelve la dirección IP
        setClientIP(response.data.ip); 
      } catch (error) {
        console.error("Error fetching the client's IPv4 address:", error);
      }
    };

    fetchClientIP();
  }, []);

  return (
    <IPContext.Provider value={clientIP}>
      {children}
    </IPContext.Provider>
  );
};
