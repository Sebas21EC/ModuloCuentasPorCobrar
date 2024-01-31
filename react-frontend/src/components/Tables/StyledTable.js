import styled from 'styled-components';
import { Table } from '@mui/material';

const StyledTable = styled(Table)`
  font-family: 'Montserrat', sans-serif;
  background-color: transparent;
  border-collapse: collapse; /* Cambiado para asegurarse de que las líneas se dibujen correctamente */
  border-spacing: 0;
  border-radius: 8px; /* Bordes redondeados para la tabla */
  overflow: hidden; /* Asegura que el borde redondeado se aplique en toda la tabla */
  
  th, td {
    border: 1px solid #e0e0e0; /* Añade bordes a cada celda */
    max-width: 150px; /* Establece un ancho máximo para las celdas */
    overflow: hidden; /* Oculta el contenido que excede del ancho de la celda */
    /* Añade "..." si el contenido es demasiado largo */
    white-space: nowrap; /* Evita que el contenido de la celda se envuelva */
  }

  th {
    font-weight: bold;
    background-color: lightgray;
  }

  /* Elimina los estilos de la última fila que eliminan el borde inferior */
`;

export default StyledTable;
