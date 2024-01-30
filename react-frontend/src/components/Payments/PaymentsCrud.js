// PaymentCrud.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
import PaymentTable from './PaymentsTable';
import RowDetailsModal from '../Modals/RowDetailsModal';
import TitleSection from '../Sidebar/TitleSection';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Button,
  Container,
  Box,
  Grid
} from '@mui/material';
import TextField from '@mui/material/TextField';


function PaymentCrud() {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Puedes cambiar este valor por defecto
  const navigate = useNavigate();
  const [columns, setColumns] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");
  const currentPayments = payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [clienteCedula, setClienteCedula] = useState('');

  const handleSearchClick = async () => {
    try {
      let url = `${API_BASE_URL}/Payment`;

      // Agregar lógica de filtro por cédula del cliente y fechas
      // if (clienteCedula && startDate && endDate) {
      //   url += `/client/${clienteCedula}/${startDate}/${endDate}`;
      // }

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
      setPayments(response.data.data);
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al cargar los pagos.');
    }
  };

  useEffect(() => {
    // Cargar todos los pagos al inicio
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Payment`);
        setPayments(response.data.data);
      } catch (err) {
        console.error(err);
        alert('Hubo un problema al cargar los pagos.');
      }
    };

    fetchPayments();
  }, []);

  const handleAddPayment = () => {
    navigate('/payment-registration');
  };
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
  const handleClienteCedulaChange = (event) => {
    setClienteCedula(event.target.value);
  };
  const handleClearClick = async () => {
    setClienteCedula(''); // Limpiar cédula
    setStartDate("");   // Usar cadena vacía
    setEndDate("");     // Usar cadena vacía
    // Recargar todos los pagos
    try {
      const response = await axios.get(`${API_BASE_URL}/Payment`);
      setPayments(response.data.data);
    } catch (err) {
      console.error(err);
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
        setCustomers(response.data.data);
        setAllCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
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
            options={customers}
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
      <PaymentTable payments={currentPayments} onViewClick={handleViewClick} columns={columns} />
      <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
        columns={PaymentTable.columns}
      />
    </Container>
  );

}

export default PaymentCrud;
