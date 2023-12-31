import React, { useState } from "react";
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
  Snackbar
} from "@mui/material";

function AddBankAccountModal({ open, onClose, onLoad }) {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [bankAccountStatus, setBankAccountStatus] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleNotificationClose = () => {
    setNotificationOpen(false); 
  };

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
              label="Bank Account Status"
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
