import BankAccountCrud from "./components/BankAccount/BankAccountCrud";
import { Component } from "react";
function App () {

 
    return (
      <div>
        <h1>Bank Accounts</h1>
        <BankAccountCrud /> {/* Renderiza el componente BankAccountCrud */}
      </div>
    );
  
}

export default App;
