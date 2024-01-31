import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

function DeleteModal({ isOpen, onClose, entity, onDelete, title, children }) {
  const handleConfirmDelete = async () => {
    try {
      await onDelete(entity); // Llama a la función onDelete pasada como prop
      onClose(); // Cierra el modal después de la eliminación
    } catch (err) {
      alert("Error al eliminar");
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error en el UI
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{children}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Sí, Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
