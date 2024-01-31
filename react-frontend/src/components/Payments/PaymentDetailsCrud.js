// PaymentCrud.js
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL,API_AUDIT_URL} from "../../config";
import PaymentDetailsTable from './PaymentDetailsTable';
import RowDetailsModal from '../Modals/RowDetailsModal';
import { IPContext } from '../../IPContext';
import {

  Container,
  Box,
  Grid
} from '@mui/material';

import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TitleSection from '../Sidebar/TitleSection';
function PaymentDetailsCrud() {
  const clientIP = useContext(IPContext);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [columns,setColumns] = useState("");

  useEffect(() => {
    loadPayments();
    const paymentDetailsTableColumns = PaymentDetailsTable.columns; // Accede a PaymentDetailsTable.columns
 
  setColumns(paymentDetailsTableColumns);
  }, []);

  const loadPayments = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/PaymentDetail`);
    //Auditoria
    const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
    const username = responseLogin ? responseLogin.username : null;
    const token = responseLogin ? responseLogin.token : null;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
    await fetch(`${API_AUDIT_URL}/audit`, {
      method: "POST",
      body: JSON.stringify({
        action: "Read Payments Details",
        description: `User ${username} read data from Payments Details`,
        ip: clientIP,
        date: formattedDate,
        functionName: "AR-PAYMENT-DETAIL-READ",
        observation: ` ${username}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //     
    if (result.data && result.data.data && Array.isArray(result.data.data)) {
      setPayments(result.data.data); // Acceder correctamente a los datos de la respuesta
      
    } else {
      throw new Error('Respuesta no válida de la API');
    }
  } catch (err) {
    alert('Hubo un problema al cargar los detalles de los pagos.');
  }
 
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
