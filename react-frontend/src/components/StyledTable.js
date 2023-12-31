import styled from 'styled-components';
import { Table} from '@mui/material';

const StyledTable = styled(Table)`
  font-family: 'Montserrat', sans-serif; /* Tipo de letra Montserrat para toda la tabla */
  background-color: transparent; /* Color de fondo transparente */
  border-collapse: separate;
  border-spacing: 0;
  border: none; /* Quita los bordes de la tabla */

  th {
    font-weight: bold; /* Texto en el encabezado en negrilla */
    background-color: lightgray; /* Fondo gris para el encabezado */
  }

  tr:last-child {
    td, th {
      border: none; /* Quita los bordes de la última fila */
    }
  }
`;

export default StyledTable;
