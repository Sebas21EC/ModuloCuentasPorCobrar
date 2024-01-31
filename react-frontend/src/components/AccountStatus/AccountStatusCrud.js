import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Container, Box, Grid } from '@mui/material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountStatusTable from './AccounStatusTable';
import TitleSection from '../Sidebar/TitleSection';
import AccountStatusPDF from '../PDF/AccountStatusPDF';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { IPContext } from '../../IPContext';
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
function AccountStatus() {
  const clientIP = useContext(IPContext);
  const [accountStatus, setAccountStatus] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clienteCedula, setClienteCedula] = useState('');
  const [customerName] = useState('');
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
  const canSearch = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isCedulaFilled = clienteCedula && clienteCedula.trim() !== '';
    const areDatesValid = start && end && start <= end;
    return isCedulaFilled && areDatesValid;
  };

  const handleSearchClick = async () => {
    if (!canSearch()) {
      alert('Por favor asegúrese de que todos los campos estén llenos y que las fechas sean correctas.');
      return;
    }
    try {
      let url = `${API_BASE_URL}/accountstatement/${clienteCedula}/${startDate}/${endDate}`;
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
          action: "Read Account Status",
          description: `User ${username} read data from Account Status`,
          ip: clientIP,
          date: formattedDate,
          functionName: "AR-ACCOUNT-STATUS",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //     


      // Asegúrate de que response.data contiene la propiedad 'data'
      if (response.data && response.data.data) {
        // Actualiza el estado con los datos recibidos

        setAccountStatus(response.data.data);

        setShowTable(true);
      } else {
        alert('No se encontraron datos para la búsqueda realizada.');
        setShowTable(false);
      }

    } catch (err) {

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
      <Box sx={{ marginTop: 0,marginBottom: 1 }}>
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
      <Box sx={{ flexGrow: 1, mt: 2 }}>
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={3}>
      <div style={{ background: '#0B2243', border: '2px solid #ccc', padding: '5px', borderRadius: '10px',textAlign: 'center'}}>
        <Typography variant="h7" style={{ color: 'white' , alignContent:'center'}}>
          Saldo Inicial: {accountStatus.beginningBalance.toFixed(2)}
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={3}>
      <div style={{ background: '#0B2243',border: '2px solid #ccc', padding: '5px', borderRadius: '10px',textAlign: 'center' }}>
        <Typography variant="h7" style={{ color: 'white' }}>
          Saldo Final: {accountStatus.endingBalance.toFixed(2)}
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrintAccountStatus}
        fullWidth // Asegura que el botón ocupe todo el ancho del Grid item
      >
        Imprimir Estado de Cuenta
      </Button>
    </Grid>
  </Grid>
</Box>

           <AccountStatusTable accountstatus={accountStatus} />

   
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
