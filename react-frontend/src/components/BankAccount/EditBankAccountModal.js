import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config"; // Asegúrate de que API_BASE_URL tenga la URL correcta

function EditBankAccountModal({ show, onClose, account, onLoad }) {
  const [number, setNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (account) {
      // Si se proporciona una cuenta, establece los valores iniciales del formulario
      setNumber(account.number);
      setBankName(account.bankName);
      setName(account.name);
      setDetails(account.details);
      setStatus(account.status);
    }
  }, [account]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza una solicitud PUT para actualizar la cuenta bancaria
      await axios.put(`${API_BASE_URL}/BankAccount/${account.id}`, {
        number: number,
        bankName: bankName,
        name: name,
        details: details,
        status: status,
      });

      // Muestra una alerta de éxito
      alert("Bank Account Updated Successfully");

      // Limpia los campos del formulario
      setNumber("");
      setBankName("");
      setName("");
      setDetails("");
      setStatus(true);

      // Llama a la función onLoad para recargar la lista de cuentas bancarias
      onLoad();

      // Cierra el modal
      onClose();
    } catch (err) {
      // Maneja errores aquí, muestra una alerta de error o realiza alguna otra acción
      alert(err.message);
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
            <h5 className="modal-title">Edit Bank Account</h5>
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
                <label>Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
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
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Details</label>
                <input
                  type="text"
                  className="form-control"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <select
                className="form-control"
                value={status ? "true" : "false"}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

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

export default EditBankAccountModal;
