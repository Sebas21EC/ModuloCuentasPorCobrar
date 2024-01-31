// src/App.js
import React, { useState,useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Sidebar/Home';
import Login from './components/Sidebar/Login';
import BankAccountCrud from './components/BankAccount/BankAccountCrud';
import PaymentsCrud from './components/Payments/PaymentsCrud';
import PaymentsRegistration from './components/Payments/PaymentsRegistration';
import PaymentDetailsCrud from './components/Payments/PaymentDetailsCrud';
import AccountStatusCrud from './components/AccountStatus/AccountStatusCrud';
import { IPProvider } from './IPContext';
import { IPContext } from './IPContext';

// Import other components you want to route to
import { useDispatch } from "react-redux";
import { loginSuccess } from "./components/Sidebar/authActions"; // Importa tu acción de éxito de inicio de sesión
import { useEffect } from "react";
import { logout } from "./components/Sidebar/authActions"; // Importa la acción de cierre de sesión
import { API_BASE_URL, API_AUDIT_URL } from "./config";

function App() {
  const clientIP = useContext(IPContext);
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
    await fetch(`${API_BASE_URL}/auth/logout`, {
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
            await fetch(`${API_AUDIT_URL}/audit`, {
              method: "POST",
              body: JSON.stringify({
                action: "Sesion ended",
                description: `User : ${username}`,
                ip: clientIP,
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
    // Establece el estado de autenticación del usuario en falso
    setIsLoggedIn(false);
    // Redirecciona a la página de inicio de sesión
    window.location.href = "/";
    
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (

    <IPProvider>
    <Router> {/* BrowserRouter aliased as Router */}
   
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
       
        <Sidebar onLogout={handleLogout}  />
        
        <main style={{ flexGrow: 1, overflowY: 'auto', backgroundColor:'#EAECF9'}}>
          <Routes> {/* Routes component wraps Route definitions */}
            <Route path="/" element={<Home/>} />
            <Route path="/estado-de-cuenta" element={<AccountStatusCrud/>} />
            <Route path="/todos-los-pagos" element={<PaymentsCrud/>} />
            <Route path="/detalles-pagos" element={<PaymentDetailsCrud/>} />
            <Route path="/cuentas-bancarias" element={<BankAccountCrud />} />
            <Route path="/agregar-pagos" element={<PaymentsRegistration />} />
            <Route
              path="/payment-registration"
              element={<PaymentsRegistration />}
            />
          </Routes>
        </main>
      </div>
    </Router>
    </IPProvider>
  );
}
export default App;
