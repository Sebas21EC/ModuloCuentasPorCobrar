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
import StyledTable from '../StyledTable';

function BankAccountTable({ bankAccounts, onEditClick, onDeleteClick }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px', boxShadow: 5 }}>
       <StyledTable sx={{ minWidth: 650 }} aria-label="bank accounts table">
        {/* Agrega el componente TableHead aquí */}
        <TableHead>
          <TableRow>
            <TableCell>CÓDIGO</TableCell>
            <TableCell>NRO. CUENTA</TableCell>
            <TableCell>ENTIDAD BANCARIA</TableCell>
            <TableCell>PROPIETARIO CUENTA</TableCell>
            <TableCell>DETALLES CUENTA</TableCell>
            <TableCell>ESTADO</TableCell>
            <TableCell>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankAccounts.map((bankAccount) => (
            <TableRow
              key={bankAccount.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {bankAccount.bankAccountId}
              </TableCell>
              <TableCell>{bankAccount.bankAccountNumber}</TableCell>
              <TableCell>{bankAccount.bankName}</TableCell>
              <TableCell>{bankAccount.bankAccountName}</TableCell>
              <TableCell>{bankAccount.bankAccountDetails}</TableCell>
              <TableCell>{bankAccount.bankAccountStatus ? "ACTIVO" : "INACTIVO"}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEditClick(bankAccount)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDeleteClick(bankAccount)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default BankAccountTable;
