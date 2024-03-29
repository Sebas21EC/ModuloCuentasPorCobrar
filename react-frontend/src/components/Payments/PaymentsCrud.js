// PaymentCrud.js
import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
import PaymentTable from './PaymentsTable';
import RowDetailsModal from '../Modals/RowDetailsModal';
import TitleSection from '../Sidebar/TitleSection';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentByID from '../PDF/PaymentByID';
import Autocomplete from '@mui/material/Autocomplete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {
  Button,
  Container,
  Box,
  Grid
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { IPContext } from '../../IPContext';

function PaymentCrud() {
  const clientIP = useContext(IPContext);
  const [payments, setPayments] = useState([]);
  const [page, ] = useState(0);
  const [rowsPerPage] = useState(10); // Puedes cambiar este valor por defecto
  const [openPrintDialog, setOpenPrintDialog] = useState(false);

  const [columns] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");
  const currentPayments = payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [clienteCedula, setClienteCedula] = useState('');
  const handlePrintClick = (item) => {
    setSelectedRow(item);
    setOpenPrintDialog(true);
  };
  
  // Esta función maneja la confirmación para imprimir.
  const handlePrintConfirmation = (shouldPrint) => {
    setOpenPrintDialog(false);
    if (shouldPrint && selectedRow) {
      fetchAndPrintPaymentDetails(selectedRow.paymentId);
    }
  };
  
  // Esta función asincrónica obtiene los detalles del pago y genera el PDF.
  const fetchAndPrintPaymentDetails = async (paymentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/PaymentDetail/report/${paymentId}`);
      //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Read/Print Payments details",
          description: `User ${username} read/print payments details`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-PAYMENT-REPORT",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //     
      // Ahora que tienes la respuesta, llama a la función que generará el PDF.
      PaymentByID(response.data.data);
    } catch (error) {
      console.error('Error al obtener los detalles del pago:', error);
      // Aquí deberías manejar el error adecuadamente, por ejemplo, mostrando una notificación al usuario.
    }
  };
  
  
  const canSearch = () => {
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);
    return (
      startDateValue &&
      endDateValue &&
      clienteCedula &&
      startDateValue <= endDateValue
    );
  };
  const handleSearchClick = async () => {
    if (!canSearch()) {
      alert('Por favor asegúrese de que todos los campos estén llenos y que las fechas sean correctas.');
      return;
    }
    try {
      let url = `${API_BASE_URL}/Payment`;


      if (clienteCedula) {
        url += `/client/${clienteCedula}`;
        if (startDate) {
          url += `/${startDate}`;
          if (endDate) {
            url += `/${endDate}`;
          }
        }
      }
      const response = await axios.get(url);
      //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Read Payments",
          description: `User ${username} read data from Payments`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-PAYMENTS-READ",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //     
      setPayments(response.data.data);
    } catch (err) {
      console.log(err);
      alert('Hubo un problema al cargar los pagos.');
    }
  };

  useEffect(() => {
    // Cargar todos los pagos al inicio
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Payment`);
        //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Read Payments",
          description: `User ${username} read data from Payments`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-PAYMENTS-READ",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //    
       
        setPayments(response.data.data);
      } catch (err) {
        alert('Hubo un problema al cargar los pagos.');
      }
    };

    fetchPayments();
  }, []);

 
  const handleViewClick = (item) => {
    
    setSelectedRow(item);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  
  const handleClearClick = async () => {
    setClienteCedula(''); // Limpiar cédula
    setStartDate("");   // Usar cadena vacía
    setEndDate("");     // Usar cadena vacía
    // Recargar todos los pagos
    try {
      const response = await axios.get(`${API_BASE_URL}/Payment`);
      setPayments(response.data.data);
       //Auditoria
       const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
       const username = responseLogin ? responseLogin.username : null;
       const token = responseLogin ? responseLogin.token : null;
       const currentDate = new Date();
       const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
       await fetch(`${API_AUDIT_URL}/audit`, {
         method: "POST",
         body: JSON.stringify({
           action: "Read Payments",
           description: `User ${username} read data from Payments`,
           ip: clientIP,
           date: formattedDate,
           functionName: "AR-PAYMENTS-READ",
           observation: ` ${username}`,
         }),
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
       });
       //    
        
    } catch (err) {
      alert('Hubo un problema al recargar los pagos.');
    }
  };

  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Customer`);

         //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Read Customers",
          description: `User ${username} read data from customers`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-CUSTOMERS-READ",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //    
       
        setCustomers(response.data.data);
        setAllCustomers(response.data.data);
      } catch (error) {
        alert("Error cargando clientes");
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filteredCustomers = (allCustomers || []).filter((customer) =>
      customer.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customerId.toString().includes(searchText)
    );
    setCustomers(filteredCustomers);
  }, [searchText, allCustomers]);

  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <TitleSection title="Listado de Pagos" IconComponent={PriceChangeIcon} />
          </Grid>
          <Grid item>
           
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            {/* <TextField
              id="cliente-cedula"
              label="Cédula del Cliente"
              type="text"
              fullWidth
              value={clienteCedula}
              onChange={handleClienteCedulaChange}
            />

             */}
             <Autocomplete
            id="customer-search-select"
  options={customers || []} // Proporciona un arreglo vacío como valor predeterminado
            // options={customers}
            getOptionLabel={(option) => `${option.customerName} (${option.customerId})`}
            
            renderInput={(params) => <TextField {...params} label="Buscar cliente" />}
            value={selectedCustomer}
            onChange={(event, newValue) => {
              setSelectedCustomer(newValue);
              setClienteCedula(newValue ? newValue.customerId : '');
            }}
            onInputChange={(event, newInputValue) => {
              setSearchText(newInputValue);
            }}
          />
           
          </Grid>
          <Grid item xs={6} sm={
            3}>
            <TextField
              id="start-date"
              label="Fecha de inicio"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="end-date"
              label="Fecha de fin"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={handleEndDateChange}
            />

           
          </Grid>
          <Grid item xs={12} sm={2}>
          <Button
              variant="contained"
              color="success"
              onClick={handleSearchClick}
              fullWidth
              disabled={!canSearch()}
            >
              Buscar
            </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
            <DeleteForeverIcon size="large"
              onClick={handleClearClick}
              // Añade estilos aquí para alinear el ícono con tu diseño
              style={{ cursor: 'pointer', color: 'grey', marginLeft: '10px', size:'large'}}
            />
            </Grid>
        
        </Grid>
      </Box>
      <PaymentTable payments={payments} onViewClick={handleViewClick} columns={columns} onPrintClick={handlePrintClick} />
      <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
        columns={PaymentTable.columns}
      />
      <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)}>
  <DialogTitle>¿Desea imprimir el detalle de este pago?</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Seleccione si desea imprimir detalle de pago antes de continuar.
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

export default PaymentCrud;
