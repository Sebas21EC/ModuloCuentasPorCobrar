import React from 'react';
import { Modal, Box, Typography, Grid, Button } from '@mui/material';

function RowDetailsModal({ open, onClose, rowDetails }) {
  // Función para transformar las claves en etiquetas legibles
  const formatKey = (key) => {
    // Transforma camelCase en texto legible
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const content = rowDetails ? (
    <Grid container spacing={2}>
      {Object.keys(rowDetails).map((key) => (
        <Grid item xs={12} key={key}>
          <Typography variant="body1">
            <strong>{formatKey(key)}:</strong> {rowDetails[key]}
          </Typography>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>No hay detalles disponibles</Typography>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Detalles de la fila
        </Typography>
        {content}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={onClose}>Cerrar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RowDetailsModal;
