// AuthContext.js
import React, { createContext } from 'react';

// Importa el hook de useSelector para acceder al estado de Redux
import { useSelector } from 'react-redux';

const AuthContext = createContext(null);

export const useAuth = () => {
  // Utiliza useSelector para acceder al estado de Redux que contiene la información de autenticación
  const authState = useSelector((state) => state.auth);

  // Retorna los datos de autenticación
  return authState;
};

export const AuthProvider = ({ children }) => {
  // Este componente ya no necesita mantener su propio estado local
  // La información de autenticación se obtendrá directamente desde Redux

  return (
    <AuthContext.Provider value={{ /* No es necesario mantener el estado local aquí */ }}>
      {children}
    </AuthContext.Provider>
  );
};
