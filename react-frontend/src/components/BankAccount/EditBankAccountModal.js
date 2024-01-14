import React, { useEffect, useState } from "react";
import axios from "../../axiosSettings";
import {API_BASE_URL,API_AUDIT_URL} from "../../config";
import EditModal from '../Modals/EditModal'; // Asegúrate de que la ruta es correcta
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EditBankAccountModal({ show, onClose, account, onLoad }) {
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
      onLoad(); // Recargar la lista de cuentas
      onClose();
    } catch (err) {
      console.error("Error al actualizar la cuenta bancaria:", err);
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
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Nombre de la entidad bancaria</InputLabel>
        <Select
          name="bankName"
          label="Nombre de la entidad bancaria"
          onChange={handleInputChange}
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
      />
      
       <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Detalle de la cuenta bancaria</InputLabel>
        <Select
          name="bankAccountDetails"
          label="Detalle de la cuenta bancaria"
          onChange={handleInputChange}
          value={formData.bankAccountDetails}
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
