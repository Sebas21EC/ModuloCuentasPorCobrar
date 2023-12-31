import React from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteBankAccountModal({ show, onClose, account, onLoad }) {
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/BankAccount/${account.bankAccountId}`);
     // alert("Cuenta bancaria eliminada exitosamente");
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

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Eliminar Cuenta Bancaria</DialogTitle>
      <DialogContent>
        <p>¿Estás seguro de que deseas eliminar esta cuenta bancaria?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Sí, Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteBankAccountModal;
