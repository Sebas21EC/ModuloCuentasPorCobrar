import React, { useState, useEffect } from "react";
import axios from "../../axiosSettings";
import {API_BASE_URL,API_AUDIT_URL} from "../../config";

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
  MenuItem
} from "@mui/material";

function AddBankAccountModal({ open, onClose, onLoad }) {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [bankAccountStatus, setBankAccountStatus] = useState(true);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const uppercaseBankAccountNumber = bankAccountNumber.toUpperCase();
    const uppercaseBankName = bankName.toUpperCase();
    const uppercaseBankAccountName = bankAccountName.toUpperCase();
    const uppercaseBankAccountDetails = bankAccountDetails.toUpperCase();


    try {
      await axios.post(`${API_BASE_URL}/BankAccount`, {
        bankAccountNumber: uppercaseBankAccountNumber,
        bankName: uppercaseBankName,
        bankAccountName: uppercaseBankAccountName,
        bankAccountDetails: uppercaseBankAccountDetails,
        bankAccountStatus: bankAccountStatus
      });
      //alert("Cuenta Bancaria registrada exitosamente!");
      //setNotificationOpen(true);
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Bank Account</DialogTitle>
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


          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Nombre de la entidad bancaria</InputLabel>
            <Select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              label="Nombre de la entidad bancaria"
            >
              <MenuItem value={"BANCO DEL PICHINCHA"}>Banco del Pichincha</MenuItem>
              <MenuItem value={"BANCO DEL AUSTRO"}>Banco del Austro</MenuItem>
              <MenuItem value={"BANCO DEL PACÍFICO"}>Banco del Pacífico</MenuItem>
              <MenuItem value={"BANCO DE GUAYAQUIL"}>Banco de Guayaquil</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Nombre del propietario de la cuenta bancaria"
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Detalles de la cuenta bancaria</InputLabel>
            <Select
              value={bankAccountDetails}
              onChange={(e) => setBankAccountDetails(e.target.value)}
              label="Detalles de la cuenta bancaria"
            >
              <MenuItem value={"AHORROS"}>Ahorros</MenuItem>
              <MenuItem value={"CORRIENTE"}>Corriente</MenuItem>
            </Select>
          </FormControl>
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

export default AddBankAccountModal;
