import React from 'react';
import CustomTable from '../Tables/CustomTable'; // Asegúrate de que la ruta es correcta

function BankAccountTable({ bankAccounts, onEditClick, onDeleteClick, onViewClick}) {
  const columns = [
    { label: 'CÓDIGO', accessor: 'bankAccountId' },
    { label: 'NRO. CUENTA', accessor: 'bankAccountNumber' },
    { label: 'ENTIDAD BANCARIA', accessor: 'bankName' },
    { label: 'PROPIETARIO CUENTA', accessor: 'bankAccountName' },
    { label: 'DETALLES CUENTA', accessor: 'bankAccountDetails' },
    { label: 'ESTADO', accessor: 'bankAccountStatus', format: (status) => status ? "ACTIVO" : "INACTIVO" },
    { label: 'ACCIONES', accessor: 'actions' }
  ];
 
  return (
    <CustomTable
    canEdit={true}
  canDelete={false}
  canView={true}
      columns={columns}
      data={bankAccounts}
      onEditClick={onEditClick}
      onViewClick={onViewClick}
      //onDeleteClick={onDeleteClick}
    />
  );
}

export default BankAccountTable;
