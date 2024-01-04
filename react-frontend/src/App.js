
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Esta función simula el inicio de sesión
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
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
