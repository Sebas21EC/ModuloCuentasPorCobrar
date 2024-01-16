import React from 'react';
//import CustomTable from '../Tables/CustomTable';
import Table from '../Tables/Table';

function PaymentTable({ payments, onEditClick, onDeleteClick, onViewClick}) {
  const columns = [
    
    { Header: 'ACCIONES', accessor: 'actions' },  
    { Header: 'CÓDIGO', accessor: 'paymentId' },
    { Header: 'CLIENTE ID', accessor: 'customerId' },
    { Header: 'CUENTA BANCARIA', accessor: 'bankAccountId' },
    { Header: 'DETALLE DE PAGO', accessor: 'paymentDetail' },
    { Header: 'MONTO', accessor: 'paymentAmount' },
    { Header: 'FECHA', accessor: 'paymentDate' },
    { Header: 'IMPRESO', accessor: 'isPrinted', format: (isPrinted) => isPrinted ? 'SÍ' : 'NO' }
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
