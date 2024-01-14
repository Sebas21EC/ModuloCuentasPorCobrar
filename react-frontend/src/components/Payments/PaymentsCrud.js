// PaymentCrud.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL,API_AUDIT_URL} from "../../config";
import PaymentTable from './PaymentsTable';
import TablePagination from '@mui/material/TablePagination';
import RowDetailsModal from '../Modals/RowDetailsModal';
import {
  Button,
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';

function PaymentCrud() {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Puedes cambiar este valor por defecto
  const navigate = useNavigate();

  useEffect(() => {
    // Suponiendo que cargas todos los pagos a la vez y los almacenas en el estado
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

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (item) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const currentPayments = payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
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
              Listado de pagos
            </Typography>
          </Grid>
         
        </Grid>
      </Box>
      <Box mb={2}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddPayment}
        >
          Agregar Pago
        </Button>
      </Box>
      <PaymentTable payments={currentPayments} onViewClick={handleViewClick} />
      <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={payments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </Container>
  );
}

export default PaymentCrud;
