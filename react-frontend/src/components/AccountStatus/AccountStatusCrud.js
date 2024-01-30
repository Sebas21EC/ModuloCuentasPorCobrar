import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
import RowDetailsModal from '../Modals/RowDetailsModal';
import TitleSection from '../Sidebar/TitleSection';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Container,
  Box,
  Grid
} from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountStatusTable from './AccounStatusTable';


function AccountStatus() {
  const [accountStatus, setAccountStatus] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Puedes cambiar este valor por defecto
  const navigate = useNavigate();
  const [columns, setColumns] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const currentAccountStatus = accountStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const [clienteCedula, setClienteCedula] = useState('');



  const handleSearchClick = async () => {
    try {
      let url = `${API_BASE_URL}/StatusAccount`;

      if (clienteCedula && startDate && endDate) {
        url += `/${clienteCedula}/${startDate}/${endDate}`;
      }
  
      const response = await axios.get(url);

      // Comprueba si la respuesta es un objeto y contiene el campo 'data'
      if (response.data && response.data.data && response.data.data.customer) {
        // Establece accountStatus con el array de payments del cliente
      setAccountStatus(response.data);
      } else {
        // Si no, muestra un error o maneja la situación como consideres apropiado
        console.error("Formato de respuesta inesperado:", response.data);
        alert('El formato de los datos recibidos es incorrecto.');
      }
    } catch (err) {
      console.error("Error al cargar los pagos:", err);
      alert('Hubo un problema al cargar los pagos.');
    }
  };
  
  


  useEffect(() => {
    // Cargar todos los pagos al inicio
    const fetchaccountStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/StatusAccount`);
        setAccountStatus(response.data.data);
      } catch (err) {
        console.error(err);
        alert('Hubo un problema al cargar los pagos.');
      }
    };

    fetchaccountStatus();
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
  const handleClienteCedulaChange = (event) => {
    setClienteCedula(event.target.value);
  };
  const handleClearClick = async () => {
    setClienteCedula(''); // Limpiar cédula
    setStartDate(null);   // Limpiar fecha de inicio
    setEndDate(null);     // Limpiar fecha de fin

    // Recargar todos los pagos
    try {
      const response = await axios.get(`${API_BASE_URL}/StatusAccount`);

      setAccountStatus(response.data.data);
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al recargar los pagos.');
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <TitleSection title="Estados de Cuenta" IconComponent={PriceChangeIcon} />
          </Grid>
          <Grid item>
           
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              id="cliente-cedula"
              label="Cédula del Cliente"
              type="text"
              fullWidth
              value={clienteCedula}
              onChange={handleClienteCedulaChange}
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
      <AccountStatusTable accountstatus={accountStatus} onViewClick={handleViewClick} columns={columns} />
      {/* <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
        columns={AccountStatusTable.columns}
      /> */}
    </Container>
  );

}

export default AccountStatus;
