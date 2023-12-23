import React, { useState, useEffect } from "react";
import axios from "axios";
import BankAccountTable from "./BankAccountTable";
import AddBankAccountModal from "./AddBankAccountModal";
import EditBankAccountModal from "./EditBankAccountModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import API_BASE_URL from "../../config";


function BankAccountCrud() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/BankAccount`);
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

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
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
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        account={selectedAccount}
        onLoad={Load}

      />
    </div>
  );
}

export default BankAccountCrud;
