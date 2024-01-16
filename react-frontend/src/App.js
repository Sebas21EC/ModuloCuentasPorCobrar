// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Sidebar/Topbar';
import Home from './components/Sidebar/Home';
import Login from './components/Sidebar/Login';
import BankAccountCrud from './components/BankAccount/BankAccountCrud';
import PaymentsCrud from './components/Payments/PaymentsCrud';
import PaymentsRegistration from './components/Payments/PaymentsRegistration';
import PaymentDetailsCrud from './components/Payments/PaymentDetailsCrud';

// Import other components you want to route to
import { useDispatch } from "react-redux";
import { loginSuccess } from "./components/Sidebar/authActions"; // Importa tu acción de éxito de inicio de sesión
import { useEffect } from "react";
import { logout } from "./components/Sidebar/authActions"; // Importa la acción de cierre de sesión
import { API_BASE_URL, API_AUDIT_URL } from "./config";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en la sessionStorage
    const responseLogin = JSON.parse(
      sessionStorage.getItem("responseLogin")
    );
    const storedToken = responseLogin ? responseLogin.token : null;

    if (storedToken) {
      // El token existe en la sessionStorage, considerar al usuario como autenticado
      dispatch(
        loginSuccess(
          storedToken,
          responseLogin.functions, 
          responseLogin.username,
          responseLogin.email
        )
      );
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

            //Auditoria
            const responseLogin = JSON.parse(
              sessionStorage.getItem("responseLogin")
            );
            const username = responseLogin ? responseLogin.username : null;
            const token = responseLogin ? responseLogin.token : null;
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
            const responseAudit = await fetch(`${API_AUDIT_URL}/audit`, {
              method: "POST",
              body: JSON.stringify({
                action: "Sesion ended",
                description: `User : ${username}`,
                ip: "192.168.0.102",
                date: formattedDate,
                functionName: "AR-LOGIN",
                observation: `${username} ended session`,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

    // Despacha la acción de cierre de sesión
    dispatch(logout());

    // Limpia el token y las funciones de la sessionStorage
    sessionStorage.removeItem("responseLogin");
    window.location.reload(); // Recarga la página para que el usuario pueda iniciar sesión nuevamente

    // Lógica adicional para redireccionar o realizar otras acciones después del cierre de sesión
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (

    
    <Router> {/* BrowserRouter aliased as Router */}
   
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
       
        <Sidebar onLogout={handleLogout}  />
        
        <main style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem', backgroundColor:'#EAECF9'}}>
          <Routes> {/* Routes component wraps Route definitions */}
            <Route path="/" element={<Home/>} />
            <Route path="/estado-de-cuenta" element={<Home/>} />
            <Route path="/todos-los-pagos" element={<PaymentsCrud/>} />
            <Route path="/detalles-pagos" element={<PaymentDetailsCrud/>} />
            <Route path="/cuentas-bancarias" element={<BankAccountCrud />} />
            <Route
              path="/payment-registration"
              element={<PaymentsRegistration />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
