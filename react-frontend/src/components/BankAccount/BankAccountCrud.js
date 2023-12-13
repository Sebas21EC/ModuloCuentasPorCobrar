import React, { useState, useEffect } from "react";
import axios from "axios";
import BankAccountTable from "./BankAccountTable";
import AddBankAccountModal from "./AddBankAccountModal";
import EditBankAccountModal from "./EditBankAccountModal";

function BankAccountCrud() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    try {
      const result = await axios.get("https://localhost:7275/api/BankAccount");
      setBankAccounts(result.data.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://localhost:7275/api/BankAccount/${id}`);
      alert("Bank Account deleted Successfully");
      Load();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Bank Account Details</h1>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleAddClick}
      >
        Add
      </button>
      <BankAccountTable
        bankAccounts={bankAccounts}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <AddBankAccountModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onLoad={Load}
      />
      <EditBankAccountModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        account={selectedAccount}
        onLoad={Load}
      />
    </div>
  );
}

export default BankAccountCrud;
