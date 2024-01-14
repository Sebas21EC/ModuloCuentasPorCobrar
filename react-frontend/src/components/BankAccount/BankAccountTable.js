import React from 'react';
import CustomTable from '../Tables/CustomTable';
import Table from '../Tables/Table'; // Asegúrate de que la ruta es correcta

function BankAccountTable({ bankAccounts, onEditClick, onDeleteClick, onViewClick}) {
  const columns = [
    { Header: 'CÓDIGO', accessor: 'bankAccountId' },
    { Header: 'NRO. CUENTA', accessor: 'bankAccountNumber' },
    { Header: 'ENTIDAD BANCARIA', accessor: 'bankName' },
    { Header: 'PROPIETARIO CUENTA', accessor: 'bankAccountName' },
    { Header: 'DETALLES CUENTA', accessor: 'bankAccountDetails' },
    { Header: 'ESTADO', accessor: 'bankAccountStatus', format: (status) => status ? "ACTIVO" : "INACTIVO" },
    { Header: 'ACCIONES', accessor: 'actions' }
  ];
 
  return (
    <Table
      columns={columns}
      data={bankAccounts}
      canEdit={true}
  canDelete={true}
  canView={true}
  onViewClick={onViewClick} 
  onDeleteClick={onDeleteClick}
  onEditClick={onEditClick}
      // Otros props como onEditClick, onDeleteClick, etc.
    />
  );
}

export default BankAccountTable;
