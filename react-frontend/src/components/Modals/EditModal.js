import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

function EditModal({ show, onClose, entity, onSave, title, children }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entity) {
      setFormData({ ...entity }); // Copia la entidad al estado del formulario
    }
  }, [entity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSave(formData); // Llama a la función onSave pasada como prop
      onClose(); // Cierra el modal después de guardar
    } catch (err) {
      alert("Error al guardar");
      // Maneja errores aquí
    }
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {React.Children.map(children, child => {
            // Clona y pasa props adicionales a los elementos hijos
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onChange: handleChange,
                value: formData[child.props.name] || '',
              });
            }
            return child;
          })}
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCELAR
            </Button>
            <Button type="submit" color="primary">
              GUARDAR
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
