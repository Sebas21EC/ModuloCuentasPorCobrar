import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Box
} from '@mui/material';
import {API_BASE_URL,API_AUDIT_URL} from "../../config";

function PaymentRegistration() {

  const navigate = useNavigate();
  const [selectedBankAccount, setSelectedBankAccount] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerSearchError, setCustomerSearchError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  //
  const [paymentDetail, setPaymentDetail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccountId, setBankAccountId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isPrinted, setIsPrinted] = useState(false);

  //
  const [paymentId, setPaymentId] = useState(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [invoicePayments, setInvoicePayments] = useState({});
  const [invoiceSelection, setInvoiceSelection] = useState([]);

  // Datos de ejemplo para cuentas bancarias y facturas pendientes
  const [bankAccounts, setBankAccounts] = useState([]);

  // ... (otros manejadores de eventos)

  useEffect(() => {
    const loadBankAccounts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/BankAccount`);
        // Asumiendo que la API responde con un objeto que tiene una propiedad 'data'
        // y que dentro de 'data' hay un arreglo de cuentas, cada una con una propiedad 'bankName'.
        const bankAccounts = response.data.data.map(account => ({
          bankName: account.bankName,
          bankAccountId: account.bankAccountId,
          bankDetails: `${account.bankAccountNumber} - ${account.bankAccountDetails}`
        }));
        setBankAccounts(bankAccounts);
      } catch (err) {
        console.error(err);
        alert('Hubo un error al cargar las cuentas bancarias.');
      }
    };

    loadBankAccounts();
  }, []);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    const uppercasePaymentDetail = paymentDetail.toUpperCase();
    const response = await axios.get(`${API_BASE_URL}/invoice/customer/${customerId}`);

    const totalBalance = response.data.data.reduce((sum, invoice) => sum + invoice.balance, 0);
    if (parseFloat(paymentAmount) <= totalBalance) {

      try {
        const response = await axios.post(`${API_BASE_URL}/Payment`, {
          customerId: customerId,
          paymentDetail: uppercasePaymentDetail,
          bankAccountId: bankAccountId,
          paymentAmount: paymentAmount,
          paymentDate: paymentDate,
          isPrinted: isPrinted
        });

        if (response.data && response.data.data && response.data.data.length) {
          const lastPayment = response.data.data[response.data.data.length - 1];
          setPaymentId(lastPayment.paymentId); // Guardar el paymentId del último pago
          // No mostramos el formulario todavía, primero cargamos las facturas pendientes
          await loadPendingInvoices(customerId);
        }

      } catch (err) {
        alert(err);
        console.log(err);
      }
    } else {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje
      alert(`El monto del pago excede el total de balances pendientes. El monto total de las facturas pendientes: ${totalBalance}`);

    }

  };

  const loadPendingInvoices = async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoice/customer/${customerId}`);

      // Suma de todos los balances de las facturas
      const totalBalance = response.data.data.reduce((sum, invoice) => sum + invoice.balance, 0);
      if (response.data.success && response.data.data) {
        setPendingInvoices(response.data.data);

        // Comparamos con el monto del pago
        if (parseFloat(paymentAmount) <= totalBalance) {
          setShowInvoiceForm(true); // Mostrar formulario si el monto del pago es menor o igual al total de balances
        } else {
          // Manejar el error aquí, por ejemplo, mostrar un mensaje
          alert("El monto del pago excede el total de balances pendientes.");
        }
      }
    } catch (error) {
      console.error('Error al cargar facturas pendientes:', error);
    }
  };


  const handleCustomerSearch = async () => {
    setCustomerSearchError('');

    // Validar que el campo de identificación del cliente no esté vacío
    if (!customerId.trim()) {
      setCustomerSearchError('Ingrese una identificación de cliente válida.');
      setCustomerName('');
      // Ocultar el segundo formulario en caso de error
      setShowPaymentForm(false);
      return;
    } else {

      try {
        const response = await axios.get(`${API_BASE_URL}/Customer/${customerId}`);
        const customerData = response.data;

        if (customerData.success && customerData.data) {
          setCustomerName(customerData.data.customerName);
          setCustomerId(customerData.data.customerId);
          // Mostrar el segundo formulario cuando se encuentre el cliente
          setShowPaymentForm(true);
        } else {
          setCustomerSearchError('Cliente no encontrado.');
          setCustomerName('');
          // Ocultar el segundo formulario en caso de error
          setShowPaymentForm(false);
        }
      } catch (error) {
        console.error('Error searching customer:', error);
        setCustomerSearchError('Error al buscar el cliente.');
        setCustomerName('');
        // Ocultar el segundo formulario en caso de error
        setShowPaymentForm(false);
      }
    }
  };

  //////

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  // };
  const handleInvoiceAmountChange = (invoiceId, amount) => {
    const newInvoicePayments = {
      ...invoicePayments,
      [invoiceId]: amount
    };
    setInvoicePayments(newInvoicePayments);
  };
  const handleInvoiceSelectionChange = (invoiceId) => {
    const newSelection = invoiceSelection.includes(invoiceId)
      ? invoiceSelection.filter(id => id !== invoiceId)
      : [...invoiceSelection, invoiceId];
    setInvoiceSelection(newSelection);
  };
  const handleSubmitPaymentDetail = async () => {
    const totalAmountToApply = invoiceSelection.reduce((sum, invoiceId) => {
      return sum + (parseFloat(invoicePayments[invoiceId]) || 0);
    }, 0);

    // Verifica si la suma de los montos a abonar es igual a paymentAmount
    if (totalAmountToApply !== parseFloat(paymentAmount)) {
      alert("La suma de los montos a abonar no coincide con el monto total del pago.");
      return;
    } else {
      // Preparar los detalles de pago para las facturas seleccionadas
      const paymentDetailsToSend = invoiceSelection.map(invoiceId => ({
        invoiceId: invoiceId,
        amountApplied: parseFloat(invoicePayments[invoiceId]) || 0, // Convertir a float y asegurar que no sea NaN
      })).filter(detail => detail.amountApplied > 0); // Filtrar los que tienen un monto a aplicar mayor a cero

      // Revisar los detalles de pago a enviar para depurar
      console.log('Detalles de pago a enviar:', paymentDetailsToSend);

      // Verificar que hay al menos un detalle de pago antes de enviar
      if (paymentDetailsToSend.length === 0) {
        console.error('No hay detalles de pago para enviar.');
        return;
      }

      // Construir el objeto a enviar
      const postData = {
        paymentId: paymentId,
        paymentDetails: paymentDetailsToSend,
      };

      // Enviar la solicitud POST a la API
      try {
        const response = await axios.post(`${API_BASE_URL}/PaymentDetail/assign`, postData);
        console.log('Respuesta de la API:', response.data);
        // Restablecer estados, mostrar confirmación, etc.
        navigate('/detalles-pagos');
      } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error al enviar detalles de pago:', error);
        // Manejar el error, mostrar mensaje al usuario, etc.
      }
    }
  };




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
      <form onSubmit={handleCustomerSearch} >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            color: '#000080',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'left',
            marginBottom: '0px'
          }}
        >
          Ingrese la identificación del cliente:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                //label="Identificación del Cliente"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                sx={{ flexGrow: 3 }}
                margin="normal"
              />
              <Button
                onClick={handleCustomerSearch}
                variant="contained"
                sx={{ flexGrow: 2 }}
              >
                Validar Cliente
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

      </form>
      {showPaymentForm && (
        <form onSubmit={handleSubmitPayment}>

          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              color: '#000080',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'left',
              marginBottom: '10px'
            }}
          >
            Complete la información del pago
          </Typography>

          <Grid container spacing={3} alignItems="flex-end" >
            {/* Campos de formulario para detalles del pago */}

            <Grid item xs={12} sm={6}>

              <TextField
                id="paymentAmount"
                name="paymentAmount"
                label="Ingrese el monto pagado"
                value={paymentAmount}
                onChange={(e) => {
                  // Permitir solo números y punto decimal
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setPaymentAmount(value);
                }}
                fullWidth
                variant="outlined"
                margin="normal"
                type="number"
                step="0.01"
                inputProps={{
                  inputMode: 'decimal', // Cambio a 'decimal' para permitir punto decimal
                  pattern: "[0-9]+([.][0-9]+)?" // Permitir números con o sin parte decimal
                }}
              />



            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="paymentDetail"
                name="paymentDetail"
                label="Detalles del Pago"
                fullWidth
                value={paymentDetail}
                onChange={(e) => setPaymentDetail(e.target.value)}
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
                  id="bankAccountId"
                  value={selectedBankAccount}
                  onChange={(e) => {
                    const selectedValue = e.target.value; // Obtén el valor seleccionado
                    setSelectedBankAccount(selectedValue); // Establece el valor seleccionado en el estado

                    // Encuentra el ID de la entidad bancaria correspondiente al valor seleccionado
                    const selectedBank = bankAccounts.find((account) => account.bankDetails === selectedValue);

                    if (selectedBank) {
                      const bankId = selectedBank.bankAccountId; // Obtiene el ID de la entidad bancaria
                      setBankAccountId(bankId); // Establece el ID de la entidad bancaria en el estado
                    } else {
                      setBankAccountId(""); // Si no se encuentra, establece el ID en vacío
                    }
                  }}
                  label="Entidad Bancaria"
                  variant="outlined"
                >
                  {bankAccounts.map((account) => (
                    <MenuItem key={account.bankName} value={account.bankDetails}>
                      {`${account.bankName} - ${account.bankDetails}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1, marginBottom: '25px', marginTop: '0px' }}>
                  Generar Pago
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

      )}
      {showInvoiceForm && (
        <Grid container spacing={2}>
          <Grid item xs={12}
            sx={{
              
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              mb: 2, // Margen en la parte inferior para espacio entre elementos
              bgcolor: 'lightgrey' // Color de fondo gris claro
            }}>
            <FormControl fullWidth>
              <InputLabel id="facturas-pendientes-label" sx={{ marginBottom: '20px', marginTop: '0px' }}>Facturas Pendientes</InputLabel>

              <List
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  '& .MuiListItem-root': {
                    py: 2, // Aumenta el espacio vertical
                  },
                  marginTop: '5px'
                }}
                component="div"
                aria-labelledby="facturas-pendientes-label"
              >
                {pendingInvoices.map((invoice) => (
                  <ListItem
                    key={invoice.invoiceId} // Aquí usamos invoice.invoiceId como key
                    secondaryAction={
                      <TextField
                        name={`invoicePayment-${invoice.invoiceId}`} // Cambiado a invoice.invoiceId
                        label="Monto a abonar"
                        type="number"
                        variant="outlined"
                        onChange={(e) =>
                          handleInvoiceAmountChange(invoice.invoiceId, e.target.value) // Cambiado a invoice.invoiceId
                        }
                        value={invoicePayments[invoice.invoiceId] || ''} // Cambiado a invoice.invoiceId
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
                          checked={invoiceSelection.includes(invoice.invoiceId)} // Cambiado a invoice.invoiceId
                          onChange={() => handleInvoiceSelectionChange(invoice.invoiceId)} // Cambiado a invoice.invoiceId
                        />
                      }
                      label={`N° FAC ${invoice.invoiceId} - Saldo Pendiente $${invoice.balance}`}
                      sx={{ width: 'calc(100% - 150px)' }}
                    />
                  </ListItem>
                ))}
              </List>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmitPaymentDetail}
              variant="contained"
              sx={{ mt: 3 }}
            >
              Generar Pago con Detalles
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default PaymentRegistration;
