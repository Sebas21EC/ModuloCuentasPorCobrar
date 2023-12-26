import React from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

function DeleteBankAccountModal({ show, onClose, account, onLoad }) {
  
  const handleConfirmDelete = async () => {
   // console.log("bankAccountId: " + account.bankAccountId);
    try {
      await axios.delete(`${API_BASE_URL}/BankAccount/${account.bankAccountId}`);
      console.log("bankAccountId: " + account.bankAccountId);
      alert("Bank Account deleted Successfully");
      onLoad(); // Cargar los datos nuevamente después de la eliminación
    } catch (err) {
      alert(err);
    } finally {
      onClose(); // Cerrar el modal después de la eliminación
    }
  };

  const handleCancelDelete = () => {
    onClose(); // Cancelar la eliminación y cerrar el modal
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Bank Account</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this bank account?</p>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Yes, Delete
            </button>
            <button className="btn btn-secondary" onClick={handleCancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBankAccountModal;
