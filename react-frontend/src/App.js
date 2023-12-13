import BankAccountCrud from "./components/BankAccount/BankAccountCrud";
import { Component } from "react";
class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      bankAccounts: []
    }
  }

  api_url = "https://localhost:7275/";

  async componentDidMount() {
    const response = await fetch(this.api_url + "api/BankAccount");
    const data = await response.json();
    this.setState({ bankAccounts: data });
  }

  render() {
    const { bankAccounts } = this.state;
    return (
      <div>
        <h1>Bank Accounts</h1>
        <BankAccountCrud /> {/* Renderiza el componente BankAccountCrud */}
      </div>
    );
  }
}

export default App;
