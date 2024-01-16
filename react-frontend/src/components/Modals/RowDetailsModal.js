import React from "react";
import { Modal, Box, Typography, Grid, Button } from "@mui/material";

function RowDetailsModal({ open, onClose, rowDetails, columns }) {
  const getColumnName = (key) => {
    if (Array.isArray(columns) && columns.length > 0) {
      const column = columns.find(col => col.accessor === key);
      return column ? column.Header : key;
    }
    return key;
  };
  const content = rowDetails ? (
    <Grid container spacing={2}>
      {Object.keys(rowDetails).map((key) => (
        <Grid item xs={12} key={key}>
          <Typography variant="body1">
            <strong>{getColumnName(key)}:</strong> {rowDetails[key]}
          </Typography>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>No hay detalles disponibles</Typography>
  );

  // Resto del código sin cambios...


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
