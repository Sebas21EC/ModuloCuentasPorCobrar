
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Sidebar/Home';
import Login from './components/Sidebar/Login';
import BankAccountCrud from './components/BankAccount/BankAccountCrud';
import PaymentsCrud from './components/Payments/PaymentsCrud';
import PaymentsRegistration from './components/Payments/PaymentsRegistration';
import PaymentDetailsCrud from './components/Payments/PaymentDetailsCrud';
// Import other components you want to route to
import { useDispatch } from 'react-redux';
import { loginSuccess } from './components/Sidebar/authActions'; // Importa tu acción de éxito de inicio de sesión
import { useEffect } from 'react';
import { logout } from './components/Sidebar/authActions'; // Importa la acción de cierre de sesión
import API_BASE_URL from './config';




function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en la sessionStorage
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      // El token existe en la sessionStorage, considerar al usuario como autenticado
      dispatch(loginSuccess(storedToken, JSON.parse(sessionStorage.getItem('functions'))));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const handleLogin =  () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
      // Despacha la acción de cierre de sesión
      dispatch(logout());

      // Limpia el token y las funciones de la sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('functions');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');

      window.location.reload(); // Recarga la página para que el usuario pueda iniciar sesión nuevamente
  
      // Lógica adicional para redireccionar o realizar otras acciones después del cierre de sesión
    };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    
    <Router> {/* BrowserRouter aliased as Router */}
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar onLogout={handleLogout}  />
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem' }}>
          <Routes> {/* Routes component wraps Route definitions */}
            <Route path="/" element={<Home/>} />
            <Route path="/estado-de-cuenta" element={<Home/>} />
            <Route path="/pagos" element={<PaymentsCrud/>} />
            <Route path="/detalles-pagos" element={<PaymentDetailsCrud/>} />
            <Route path="/cuentas-bancarias" element={<BankAccountCrud />} />
            <Route path="/payment-registration" element={<PaymentsRegistration />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
