// AuthProvider.js
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from './authActions';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, functions } = useSelector((state) => state.auth);

  // Lógica para comprobar la autenticación al cargar la página (puedes personalizarla)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const functions = localStorage.getItem('functions');

    if (token && functions) {
      dispatch(loginSuccess(token, functions));
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, functions }}>
      {children}
    </AuthContext.Provider>
  );
};
