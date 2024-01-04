import React from 'react';
import CustomTable from '../Tables/CustomTable';

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
        <CustomTable
        canEdit={false}
  canDelete={false}
  canView={true}
          columns={columns}
          data={payments}
          onViewClick={onViewClick} // Ahora 'payments' es un array
          // Resto de tus props, como onEditClick y onDeleteClick
        />
      ) : (
        <p>No hay datos para mostrar.</p> // O algún otro UI de carga o error.
      )}
    </>
  );
}

export default PaymentTable;
