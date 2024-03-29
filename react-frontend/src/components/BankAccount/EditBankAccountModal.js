import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosSettings";
import {API_BASE_URL,API_AUDIT_URL} from "../../config";
import EditModal from '../Modals/EditModal'; 
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IPContext } from '../../IPContext';

function EditBankAccountModal({ show, onClose, account, onLoad }) {
  const clientIP = useContext(IPContext);
  const [formData, setFormData] = useState({
    bankAccountNumber: '',
    bankName: '',
    bankAccountName: '',
    bankAccountDetails: '',
    bankAccountStatus: true,
  });

  useEffect(() => {
    if (account) {
      setFormData({
        bankAccountNumber: account.bankAccountNumber,
        bankName: account.bankName,
        bankAccountName: account.bankAccountName,
        bankAccountDetails: account.bankAccountDetails,
        bankAccountStatus: account.bankAccountStatus,
      });
    }
  }, [account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bankAccountNumber') {
      const numericalValue = value.replace(/\D/g, '');
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: numericalValue
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (updatedAccount) => {
    try {
      const uppercaseAccount = {
        ...updatedAccount,
        bankName: updatedAccount.bankName.toUpperCase(),
        bankAccountName: updatedAccount.bankAccountName.toUpperCase(),
        bankAccountDetails: updatedAccount.bankAccountDetails.toUpperCase(),
      };

      await axios.put(`${API_BASE_URL}/BankAccount/${account.bankAccountId}`, uppercaseAccount);
      //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Edit Bank Accounts",
          description: `User ${username} edit data from Bank Accounts`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-BANK-ACCOUNTS-UPDATE",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //    
      onLoad(); // Recargar la lista de cuentas
      onClose();

    } catch (err) {
      alert("Error al actualizar la cuenta bancaria");
    }
  };

  return (
    <EditModal
      show={show}
      onClose={onClose}
      entity={formData}
      onSave={handleSubmit}
      title="Editar Cuenta Bancaria"
    >
      <TextField
        name="bankAccountNumber"
        label="Número de cuenta bancaria"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={handleInputChange}
        value={formData.bankAccountNumber}
        disabled
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Nombre de la entidad bancaria</InputLabel>
        <Select
          name="bankName"
          label="Nombre de la entidad bancaria"
          onChange={handleInputChange}
          disabled
          value={formData.bankName}
        >
          <MenuItem value={"BANCO DEL PICHINCHA"}>Banco del Pichincha</MenuItem>
              <MenuItem value={"BANCO DEL AUSTRO"}>Banco del Austro</MenuItem>
              <MenuItem value={"BANCO DEL PACÍFICO"}>Banco del Pacífico</MenuItem>
              <MenuItem value={"BANCO DE GUAYAQUIL"}>Banco de Guayaquil</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="bankAccountName"
        label="Nombre del propietario de la cuenta bancaria"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={handleInputChange}
        value={formData.bankAccountName}
        disabled
      />
      
       <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Detalle de la cuenta bancaria</InputLabel>
        <Select
          name="bankAccountDetails"
          label="Detalle de la cuenta bancaria"
          onChange={handleInputChange}
          value={formData.bankAccountDetails}
          disabled
        >
          <MenuItem value={"AHORROS"}>Ahorros</MenuItem>
              <MenuItem value={"CORRIENTE"}>Corriente</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select
          name="bankAccountStatus"
          label="Estado de la cuenta bancaria"
          onChange={handleInputChange}
          value={formData.bankAccountStatus}
        >
          <MenuItem value={true}>Activo</MenuItem>
          <MenuItem value={false}>Inactivo</MenuItem>
        </Select>
      </FormControl>
    </EditModal>
  );
}

export default EditBankAccountModal;
