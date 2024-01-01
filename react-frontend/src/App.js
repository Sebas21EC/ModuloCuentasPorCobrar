
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Sidebar/Home';
import Login from './components/Sidebar/Login';
import BankAccountCrud from './components/BankAccount/BankAccountCrud';
import PaymentRegistration from './components/Payments/PaymentRegistration';
// Import other components you want to route to

function App() {
  return (
    <Router> {/* BrowserRouter aliased as Router */}
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem' }}>
          <Routes> {/* Routes component wraps Route definitions */}
            <Route path="/" element={<Home/>} />
            <Route path="/estado-de-cuenta" element={<Login/>} />
            <Route path="/pagos" element={<PaymentRegistration/>} />
            <Route path="/cuentas-bancarias" element={<BankAccountCrud />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
