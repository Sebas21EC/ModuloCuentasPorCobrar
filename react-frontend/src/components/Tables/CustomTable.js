import React from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledTable from './StyledTable'; // Asegúrate de que la ruta es correcta
import VisibilityIcon from '@mui/icons-material/Visibility';

function CustomTable({ columns, data, onEditClick, onDeleteClick, onViewClick,canEdit = true, canDelete = true , canView=true }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px', boxShadow: 5 }}>
      <StyledTable sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column, columnIndex) => (
    <TableCell key={columnIndex}>
      {column.accessor !== 'actions' ?
        (column.format ? column.format(item[column.accessor]) : item[column.accessor]) :
        <>
          {canEdit && (
            <IconButton color="primary" onClick={() => onEditClick(item)}>
              <EditIcon />
            </IconButton>
          )}
          {canDelete && (
            <IconButton color="error" onClick={() => onDeleteClick(item)}>
              <DeleteIcon />
            </IconButton>
          )}

{canView && (
             <IconButton onClick={() => onViewClick(item)}> 
             <VisibilityIcon />
           </IconButton>
          )}
        </>
      }
    </TableCell>

              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default CustomTable;
