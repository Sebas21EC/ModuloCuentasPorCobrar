import React from 'react';
//import CustomTable from '../Tables/CustomTable';
import Table from '../Tables/Table';
const formatDate = (value) => {
  // Suponiendo que 'value' es una cadena de fecha ISO como '2024-01-21T00:00:00'
  const dateObject = new Date(value);
  return dateObject.toISOString().split('T')[0]; // Esto devolverá 'YYYY-MM-DD'
};
function PaymentTable({ payments, onEditClick, onDeleteClick, onViewClick}) {
  const columns = [
    
    { Header: 'ACCIONES', accessor: 'actions' },  
    { Header: 'CÓDIGO', accessor: 'paymentId' },
    { Header: 'CLIENTE ID', accessor: 'customerId' },
    { Header: 'CUENTA BANCARIA', accessor: 'bankAccountId' },
    { Header: 'DETALLE DE PAGO', accessor: 'paymentDetail' },
    { Header: 'MONTO', accessor: 'paymentAmount' },
    { Header: 'FECHA', accessor: 'paymentDate',Cell: ({ value }) => formatDate(value) },
   
    // { Header: 'IMPRESO', accessor: 'isPrinted', format: (isPrinted) => isPrinted ? 'SÍ' : 'NO' }
  ];
  
  // Asumiendo que 'payments' es ahora un array directamente
  const dataIsValid = Array.isArray(payments);
  PaymentTable.columns = columns;
  return (
    <>
      {dataIsValid ? (
        <Table
        columns={columns}
        data={payments}
        canEdit={false}
    canDelete={false}
    canView={true}
    onViewClick={onViewClick} 
    onDeleteClick={onDeleteClick}
    onEditClick={onEditClick}
        // Otros props como onEditClick, onDeleteClick, etc.
      />
      ) : (
        <p>No hay datos para mostrar.</p> // O algún otro UI de carga o error.
      )}
    </>
  );
}

export default PaymentTable;
