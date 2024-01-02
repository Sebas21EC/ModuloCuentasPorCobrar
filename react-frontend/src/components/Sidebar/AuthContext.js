// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Lógica para iniciar y cerrar sesión...

  return (
    <AuthContext.Provider value={{ isAuthenticated, /* otras propiedades */ }}>
      {children}
    </AuthContext.Provider>
  );
};
