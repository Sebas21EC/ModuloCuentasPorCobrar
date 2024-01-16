// PaymentCrud.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config';
import PaymentDetailsTable from './PaymentDetailsTable';
import RowDetailsModal from '../Modals/RowDetailsModal';
import {

  Container,
  Box,
  Grid
} from '@mui/material';

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TitleSection from '../Sidebar/TitleSection';
function PaymentDetailsCrud() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [columns,setColumns] = useState("");

  useEffect(() => {
    loadPayments();
    const paymentDetailsTableColumns = PaymentDetailsTable.columns; // Accede a PaymentDetailsTable.columns
  console.log('Payment Details Table Columns:', paymentDetailsTableColumns);
  setColumns(paymentDetailsTableColumns);
  }, []);

  const loadPayments = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/PaymentDetail`);
    if (result.data && result.data.data && Array.isArray(result.data.data)) {
      setPayments(result.data.data); // Acceder correctamente a los datos de la respuesta
      
    } else {
      throw new Error('Respuesta no válida de la API');
    }
  } catch (err) {
    console.error(err);
    alert('Hubo un problema al cargar los detalles de los pagos.');
  }
 
};

  
  

  const handleAddPayment = () => {
    // Navegar al formulario de registro de pagos para agregar un nuevo pago
    navigate('/payment-registration');
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (item) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Lógica para editar y eliminar pagos...

  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
          {/* <Typography 
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
              Listado de pagos con sus respectivos detalles
            </Typography> */}
            <TitleSection title=" Listado de pagos con sus respectivos detalles" IconComponent={PriceChangeIcon} />

          </Grid>
         
        </Grid>
      </Box>
      <Box mb={2}>
        
      </Box>
      <PaymentDetailsTable
        paymentDetails={payments}
        onViewClick={handleViewClick}
        columns={columns} 
        // Pasar funciones para editar y eliminar como props
      />
      <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
        columns={PaymentDetailsTable.columns} 
      />
    </Container>
  );
}

export default PaymentDetailsCrud;
