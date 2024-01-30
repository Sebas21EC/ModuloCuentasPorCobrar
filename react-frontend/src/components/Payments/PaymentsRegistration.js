import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Autocomplete } from '@mui/material';
import CustomerModal from '../Modals/CustomerModal';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TitleSection from '../Sidebar/TitleSection';
import PaymentsDetailsPDF from '../PDF/PaymentsDetailsPDF';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
import { API_BASE_URL, API_AUDIT_URL } from "../../config";

function PaymentRegistration() {

  const navigate = useNavigate();
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [customers, setCustomers] = useState([]);

  const [customerName, setCustomerName] = useState('');
  const [customerSearchError, setCustomerSearchError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  //
  const [paymentDetail, setPaymentDetail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccountId, setBankAccountId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  //
  const [paymentId, setPaymentId] = useState(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [invoicePayments, setInvoicePayments] = useState({});
  const [invoiceSelection, setInvoiceSelection] = useState([]);
  const [isPrinted, setIsPrinted] = useState([]);
  const [balance, setBalance] = useState([]);
  //
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentDetailsForPDF, setPaymentDetailsForPDF] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  // Datos de ejemplo para cuentas bancarias y facturas pendientes
  const [bankAccounts, setBankAccounts] = useState([]);




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
          isPrinted: false
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

  const handleOpenCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  const handleCloseCustomerModal = () => {
    setIsCustomerModalOpen(false);
  };

  // const handleSelectCustomer = (customerId, customerName) => {
  //   setSelectedCustomerId(customerId);
  //   setCustomerId(customerId);
  //   setCustomerName(customerName);
  //   console.log(customerName)
  //   // Mostrar el segundo formulario cuando se encuentre el cliente
  //   setShowPaymentForm(true);
  //   handleCloseCustomerModal();
  // };
  //////

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  // };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      const postData = {
        paymentId: paymentId,
        paymentDetails: paymentDetailsToSend,
      };


      const detailsPDF = {
        paymentDetailsToSend,
        customerName,
        customerId,
        paymentDate,
        paymentId,
        paymentDetail,
        bankAccountId,
        paymentAmount

      }

      try {
        const response = await axios.post(`${API_BASE_URL}/PaymentDetail/assign`, postData);
        console.log('Respuesta de la API:', response.data);
        const paymentDetail = response.data;
        // Restablecer estados, mostrar confirmación, etc.
        setPaymentDetailsForPDF(detailsPDF);
        setIsDialogOpen(true);


      } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error al enviar detalles de pago:', error);
        // Manejar el error, mostrar mensaje al usuario, etc.
      }
    }
  };
  const markPaymentAsPrinted = async (paymentId) => {
    try {
      const response = await axios.put(`/api/Payment/${paymentId}`, { isPrinted: true });
      console.log('Pago marcado como impreso:', response.data);
    } catch (error) {
      console.error('Error al marcar el pago como impreso:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };
  const handlePrintConfirmation = (shouldPrint) => {
    setIsDialogOpen(false); // Cierra el diálogo independientemente de la decisión
    if (shouldPrint) {

      PaymentsDetailsPDF(paymentDetailsForPDF);

      markPaymentAsPrinted(paymentDetailsForPDF.paymentId);

      navigate('/todos-los-pagos');
    } else {

      navigate('/todos-los-pagos');
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Customer`);

        setCustomers(response.data.data);
        setAllCustomers(response.data.data);
      } catch (error) {
        console.error("Error cargando los clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filteredCustomers = allCustomers.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customerId.toString().includes(searchText)
    );
    setCustomers(filteredCustomers);
  }, [searchText, allCustomers]);

  useEffect(() => {
    if (customerId) {
      async function fetchCustomerBalance() {
        try {
          const response = await axios.get(`${API_BASE_URL}/invoice/customer/${customerId}`);
          const totalBalance = response.data.data.reduce((sum, invoice) => sum + invoice.balance, 0);
          setBalance(totalBalance);
        } catch (error) {
          setCustomerSearchError('Error al obtener la deuda del cliente');
        }
      }

      fetchCustomerBalance();
    }
  }, [customerId]);


  return (

    <Container maxWidth="md">
      <TitleSection title="Registro de Pago" IconComponent={PriceChangeIcon} />
      <Grid container spacing={12} alignItems="center">
        <Grid item xs={6}>
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
              marginBottom: '10px',
              marginTop: '10px',
            }}
          >
            Seleccione un cliente:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="customer-search-select"
            options={customers}
            getOptionLabel={(option) => `${option.customerName} (${option.customerId})`}

            renderInput={(params) => <TextField {...params} label="Buscar cliente" />}
            value={selectedCustomer}
            onChange={(event, newValue) => {
              setSelectedCustomer(newValue);
              setCustomerId(newValue ? newValue.customerId : '');
              setCustomerName(newValue ? newValue.customerName : '');

              setShowPaymentForm(true);
            }}
            onInputChange={(event, newInputValue) => {
              setSearchText(newInputValue);
            }}
          />
        </Grid>
        <Grid item xs={12}> {/* Asegura que ocupe todo el ancho disponible */}
        <Box
    display="flex"
    justifyContent="center"
    mt={-2} // Ajusta el margin-top para acercar la Card si es necesario
  >
    {customerName && (
      <Card
        variant="outlined"
        sx={{
          maxWidth: '100%',
          borderRadius: '16px',
          mt: -1, // Ajusta el margin-top aquí si es necesario
          backgroundColor: '#386EBC', // Cambia el color de fondo a #90B2E4
          color: 'white', // Cambia el color del texto a blanco
          height: '60px'
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              fontWeight: 'normal', // Quita fontWeight para eliminar la negrita
            }}
          >
            Nombre del Cliente: {customerName} ⮕ Deuda Total $  {balance.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    )}
  </Box>
        </Grid>

      </Grid>
     
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
              marginBottom: '10px',
              marginTop: '10px',
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

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Detalles de pago</InputLabel>
                <Select
                  required
                  value={paymentDetail}
                  onChange={(e) => setPaymentDetail(e.target.value)}
                  label="Detalles de pago"
                >
                  <MenuItem value={"PAGO EN EFECTIVO"}>Pago en efectivo</MenuItem>
                  <MenuItem value={"TRANSFERENCIA"}>Transferencia</MenuItem>
                </Select>
              </FormControl>



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
      <Dialog open={isDialogOpen} onClose={() => handlePrintConfirmation(false)}>
        <DialogTitle>¿Desea imprimir el pago realizado?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione si desea imprimir el pago antes de continuar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePrintConfirmation(true)}>Sí, imprimir</Button>
          <Button onClick={() => handlePrintConfirmation(false)}>No, continuar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PaymentRegistration;
