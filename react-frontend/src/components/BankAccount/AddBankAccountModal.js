import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config"; // Asegúrate de que API_BASE_URL tenga la URL correcta


function AddBankAccountModal({ show, onClose, onLoad }) {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [bankAccountStatus, setBankAccountStatus] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      bankAccountNumber,
      bankName,
      bankAccountName,
      bankAccountDetails,
      bankAccountStatus,
    });

    try {
      await axios.post(`${API_BASE_URL}/BankAccount`, {
        bankAccountNumber: bankAccountNumber,
        bankName: bankName,
        bankAccountName: bankAccountName,
        bankAccountDetails: bankAccountDetails,
        bankAccountStatus: bankAccountStatus,
      });
      alert("Bank Account Registration Successfully");
      setBankAccountNumber("");
      setBankName("");
      setBankAccountName("");
      setBankAccountDetails("");
      setBankAccountStatus(true);
      onLoad();
      onClose();
    } catch (err) {
      alert(err);
    }
  };

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
            <h5 className="modal-title">Add Bank Account</h5>
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bank Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Account Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank  Account Details</label>
                <input
                  type="text"
                  className="form-control"
                  value={bankAccountDetails}
                  onChange={(e) => setBankAccountDetails(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Account Status</label>
                <select
                  className="form-control"
                  value={bankAccountStatus}
                  onChange={(e) => setBankAccountStatus(e.target.value)}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBankAccountModal;
