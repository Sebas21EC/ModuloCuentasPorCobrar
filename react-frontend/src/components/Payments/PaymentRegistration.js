import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Box,
  Paper,
} from '@mui/material';
import API_BASE_URL from "../../config";

function PaymentRegistration() {
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [invoiceSelection, setInvoiceSelection] = useState([]);
  const [invoicePayments, setInvoicePayments] = useState({});
  const [paymentNumber] = useState('PAG-CLI-00001'); // Simular número de pago autogenerado
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerSearchError, setCustomerSearchError] = useState('');

  // Datos de ejemplo para cuentas bancarias y facturas pendientes
  const [bankAccounts, setBankAccounts] = useState([]);

  // ... (otros manejadores de eventos)

  useEffect(() => {
    const loadBankAccounts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/BankAccount`);
        // Asumiendo que la API responde con un objeto que tiene una propiedad 'data'
        // y que dentro de 'data' hay un arreglo de cuentas, cada una con una propiedad 'bankName'.
        const bankNames = response.data.data.map(account => account.bankName);
        setBankAccounts(bankNames);
      } catch (err) {
        console.error(err);
        alert('Hubo un error al cargar las cuentas bancarias.');
      }
    };
  
    loadBankAccounts();
  }, []);
  
  const pendingInvoices = [
    { id: 1, description: 'Factura 1', amountDue: 50 },
    { id: 2, description: 'Factura 2', amountDue: 5 },
    { id: 3, description: 'Factura 3', amountDue: 100 },
  ];

  // Manejadores de eventos y lógica de envío del formulario...
  // Estos deben ser implementados según la lógica de tu aplicación.

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementar lógica de envío aquí
  };
  const handleInvoiceAmountChange = (invoiceId, amount) => {
    setInvoicePayments((prevPayments) => ({
      ...prevPayments,
      [invoiceId]: amount,
    }));
  };

  const handleInvoiceSelectionChange = (invoiceId) => {
    setInvoiceSelection((prevSelection) => {
      const newSelection = prevSelection.includes(invoiceId)
        ? prevSelection.filter((id) => id !== invoiceId)
        : [...prevSelection, invoiceId];
      if (!newSelection.includes(invoiceId)) {
        delete invoicePayments[invoiceId];
        setInvoicePayments({ ...invoicePayments });
      }
      return newSelection;
    });
  };
  const handleCustomerSearch = async () => {
    setCustomerSearchError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/Customer/${customerID}`);
      setCustomerName(response.data.customerName); // Asegúrate de ajustar esto a tu estructura de datos
    } catch (error) {
      console.error('Error searching customer:', error);
      setCustomerSearchError('No se encontró el cliente.');
      setCustomerName('');
    }
  };

  // Resto de los manejadores de eventos...

  return (
    <Container maxWidth="md">
      <Typography 
        variant="h2" 
        component="div" 
        gutterBottom 
        sx={{ 
          color: '#1976d2', 
          textTransform: 'uppercase', 
          fontWeight: 'bold', 
          mb: 4,
          textAlign: 'center'
        }}
      >
        REGISTRO DE PAGO
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
  <Grid item xs={12}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Identificación del Cliente"
        value={customerID}
        onChange={(e) => setCustomerID(e.target.value)}
        sx={{ flexGrow: 3 }}
        margin="normal"
      />
      <Button
        onClick={handleCustomerSearch}
        variant="contained"
        sx={{ flexGrow: 2 }}
      >
        Buscar Cliente
      </Button>
    </Box>
    {customerName && (
      <Typography variant="body1">
        Nombre del Cliente: {customerName}
      </Typography>
    )}
    {customerSearchError && (
      <Typography variant="body2" color="error">
        {customerSearchError}
      </Typography>
    )}
  </Grid>
</Grid>
        <Grid container spacing={3}>
          {/* Campos de formulario para detalles del pago */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="paymentNumber"
              name="paymentNumber"
              label="Número de Pago"
              fullWidth
              value={paymentNumber}
              disabled
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="paymentDescription"
              name="paymentDescription"
              label="Descripción del Pago"
              fullWidth
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="paymentDate"
              label="Fecha del Pago"
              type="date"
              fullWidth
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="bank-account-select-label">Entidad Bancaria</InputLabel>
              <Select
                labelId="bank-account-select-label"
                id="bankAccount"
                value={selectedBankAccount}
                onChange={(e) => setSelectedBankAccount(e.target.value)}
                label="Entidad Bancaria"
                variant="outlined"
              >
                {bankAccounts.map((account) => (
                  <MenuItem key={account} value={account}>
                    {account}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="facturas-pendientes-label">Facturas Pendientes</InputLabel>
              <List
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  '& .MuiListItem-root': { // Agregar padding al ListItem
                    py: 2, // Aumenta el espacio vertical
                  },
                }}
                component="div"
                aria-labelledby="facturas-pendientes-label"
              >
                {pendingInvoices.map((invoice) => (
                  <ListItem
                    key={invoice.id}
                    secondaryAction={
                      <TextField
                        name={`invoicePayment-${invoice.id}`}
                        label="Monto a abonar"
                        type="number"
                        variant="outlined"
                        onChange={(e) =>
                          handleInvoiceAmountChange(invoice.id, e.target.value)
                        }
                        value={invoicePayments[invoice.id] || ''}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ width: '150px' }}
                      />
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={invoiceSelection.includes(invoice.id)}
                          onChange={() => handleInvoiceSelectionChange(invoice.id)}
                        />
                      }
                      label={`${invoice.description} - Saldo Pendiente $${invoice.amountDue}`}
                      sx={{ width: 'calc(100% - 150px)' }} // Asegurarse de que la etiqueta no ocupe más espacio del necesario
                    />
                  </ListItem>
                ))}
              </List>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
                Registrar Pago
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default PaymentRegistration;
