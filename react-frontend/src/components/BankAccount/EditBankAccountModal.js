import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function EditBankAccountModal({ show, onClose, account, onLoad }) {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [bankAccountStatus, setBankAccountStatus] = useState(true);

  useEffect(() => {
    if (account) {
      // Si se proporciona una cuenta, establece los valores iniciales del formulario
      setBankAccountNumber(account.bankAccountNumber);
      setBankName(account.bankName);
      setBankAccountName(account.bankAccountName);
      setBankAccountDetails(account.bankAccountDetails);
      setBankAccountStatus(account.bankAccountStatus);
    }
  }, [account]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza una solicitud PUT para actualizar la cuenta bancaria
      await axios.put(`${API_BASE_URL}/BankAccount/${account.bankAccountId}`, {
        bankAccountNumber: bankAccountNumber,
        bankName: bankName,
        bankAccountName: bankAccountName,
        bankAccountDetails: bankAccountDetails,
        bankAccountStatus: bankAccountStatus,
      });

      // Muestra una alerta de éxito
      //alert("Cuenta bancaria actualizada exitosamente");

      // Limpia los campos del formulario
      setBankAccountNumber("");
      setBankName("");
      setBankAccountName("");
      setBankAccountDetails("");
      setBankAccountStatus(true);

      // Llama a la función onLoad para recargar la lista de cuentas bancarias
      onLoad();
      onClose();
    } catch (err) {
      // Maneja errores aquí, muestra una alerta de error o realiza alguna otra acción
      alert(err.message);
    }
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>Editar Cuenta Bancaria</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Número de cuenta bancaria"
            value={bankAccountNumber}
            onChange={(e) => {
              
              const value = e.target.value.replace(/\D/g, ''); 
              setBankAccountNumber(value);
            }}
            fullWidth
            variant="outlined"
            margin="normal"
            type="number" 
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
          />
          <TextField
            label="Nombre de la entidad bancaria"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Nombre del propietario de la cuenta bancaria"
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Detalle de la cuenta bancaria"
            value={bankAccountDetails}
            onChange={(e) => setBankAccountDetails(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              value={bankAccountStatus}
              onChange={(e) => setBankAccountStatus(e.target.value)}
              label="Estado de la cuenta bancaria"
            >
              <MenuItem value={true}>Activo</MenuItem>
              <MenuItem value={false}>Inactivo</MenuItem>
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCELAR
            </Button>
            <Button type="submit" color="primary">
              GUARDAR
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBankAccountModal;
