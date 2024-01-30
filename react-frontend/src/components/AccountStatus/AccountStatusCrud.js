import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Container, Box, Grid } from '@mui/material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountStatusTable from './AccounStatusTable';
import TitleSection from '../Sidebar/TitleSection';
import AccountStatusPDF from '../PDF/AccountStatusPDF';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Typography } from '@mui/material';
function AccountStatus() {
  const [accountStatus, setAccountStatus] = useState([]);

  const [showTable, setShowTable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [clienteCedula, setClienteCedula] = useState('');
  const [customerName, setCustomerName] = useState('');


  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  const handlePrintAccountStatus = () => {

    setIsDialogOpen(true); // Abre el diálogo al hacer clic
  };

  const handlePrintConfirmation = (shouldPrint) => {
    const date = {
      startDate: startDate,
      endDate: endDate
    };
    if (shouldPrint) {
      AccountStatusPDF(accountStatus, date);
    }
    setIsDialogOpen(false);
  };
  
  


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
  const canSearch = () => {
    return (
      startDate &&
      endDate &&
      clienteCedula &&
      new Date(startDate) <= new Date(endDate)
    );
  };

  const handleSearchClick = async () => {
    if (!canSearch()) {
      alert('Por favor asegúrese de que todos los campos estén llenos y que las fechas sean correctas.');
      return;
    }
    try {
      let url = `${API_BASE_URL}/accountstatement/${clienteCedula}/${startDate}/${endDate}`;
      const response = await axios.get(url);

      // Asegúrate de que response.data contiene la propiedad 'data'
      if (response.data && response.data.data) {
        // Actualiza el estado con los datos recibidos



        setAccountStatus(response.data.data);
        console.log(response.data.data);
        setShowTable(true);
      } else {
        alert('No se encontraron datos para la búsqueda realizada.');
      }

    } catch (err) {
      console.error("Error al cargar los estados de cuenta:", err);
      alert('Hubo un problema al cargar los estados de cuenta.');
    }
  };

  const handleClearClick = () => {
    setClienteCedula('');
    setStartDate("");
    setEndDate("");
    setShowTable(false);
  };



  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <TitleSection title="Estados de Cuenta" IconComponent={PriceChangeIcon} />


          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Autocomplete
            required
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
          <Grid item xs={6} sm={3}>
            <TextField
              id="start-date"
              label="Fecha de inicio"
              required
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="end-date"
              label="Fecha de fin"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
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
            <DeleteForeverIcon
              onClick={handleClearClick}
              style={{ cursor: 'pointer', color: 'grey', marginLeft: '10px', size: 'large' }}
            />
          </Grid>
        </Grid>
      </Box>

      {showTable && (
        <>
          <Grid>
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              {customerName && (
                <Typography variant="h6">
                  Saldo Inicial {accountStatus.beginningBalance.toFixed(2)}
                  Saldo Final {accountStatus.endingBalance.toFixed(2)}
                </Typography>
              )}              
            </Box></Grid>
           
          <AccountStatusTable accountstatus={accountStatus} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrintAccountStatus}
              
            >
              Imprimir Estado de Cuenta
            </Button>
          </Box>
        </>
      )}
      <Dialog open={isDialogOpen} onClose={() => handlePrintConfirmation(false)}>
        <DialogTitle>¿Desea imprimir el estado de cuenta?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione si desea imprimir el estado de cuenta antes de continuar.
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

export default AccountStatus;
