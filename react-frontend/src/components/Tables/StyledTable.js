import styled from 'styled-components';
import { Table} from '@mui/material';

const StyledTable = styled(Table)`
  font-family: 'Montserrat', sans-serif;
  background-color: transparent;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px; /* Bordes redondeados para la tabla */
  overflow: hidden; /* Asegura que el borde redondeado se aplique en toda la tabla */
  
  th, td {
    border: 1px solid #e0e0e0; /* Añade bordes a cada celda */
  }

  th {
    font-weight: bold;
    background-color: lightgray;
  }

  tr:last-child {
    td, th {
      border-bottom: none; /* Elimina el borde inferior de la última fila */
    }
  }
`;



export default StyledTable;
