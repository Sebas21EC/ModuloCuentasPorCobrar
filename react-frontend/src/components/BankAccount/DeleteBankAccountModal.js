import React from 'react';
import axios from "../../axiosSettings";
import {API_BASE_URL,API_AUDIT_URL} from "../../config";
import DeleteModal from '../Modals/DeleteModal'; // Asegúrate de que la ruta es correcta

function DeleteBankAccountModal({ show, onClose, account, onLoad }) {
  const handleDeleteAccount = async (account) => {
    try {
      await axios.delete(`${API_BASE_URL}/BankAccount/${account.bankAccountId}`);
      // Manejo después de la eliminación exitosa
      onLoad();
    } catch (err) {
      // Manejo de errores
      alert("Error al eliminar la cuenta bancaria");
    }
    onClose();
  };

  return (
    <DeleteModal
      isOpen={show}
      onClose={onClose}
      entity={account}
      onDelete={handleDeleteAccount}
      title="Eliminar Cuenta Bancaria"
    >
      ¿Estás seguro de que deseas eliminar esta cuenta bancaria?
    </DeleteModal>
  );
}

export default DeleteBankAccountModal;
