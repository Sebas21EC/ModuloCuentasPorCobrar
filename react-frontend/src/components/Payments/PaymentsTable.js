import React from 'react';
//import CustomTable from '../Tables/CustomTable';
import Table from '../Tables/Table';

function PaymentTable({ payments, onEditClick, onDeleteClick, onViewClick}) {
  const columns = [
    { label: 'CÓDIGO', accessor: 'paymentId' },
    { label: 'CLIENTE ID', accessor: 'customerId' },
    { label: 'CUENTA BANCARIA', accessor: 'bankAccountId' },
    { label: 'DETALLE DE PAGO', accessor: 'paymentDetail' },
    { label: 'MONTO', accessor: 'paymentAmount' },
    { label: 'FECHA', accessor: 'paymentDate' },
    { label: 'IMPRESO', accessor: 'isPrinted', format: (isPrinted) => isPrinted ? 'SÍ' : 'NO' },
    { label: 'ACCIONES', accessor: 'actions' }
  ];
  
  // Asumiendo que 'payments' es ahora un array directamente
  const dataIsValid = Array.isArray(payments);

  return (
    <>
      {dataIsValid ? (
        <Table
        columns={columns}
        data={payments}
        canEdit={true}
    canDelete={true}
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
