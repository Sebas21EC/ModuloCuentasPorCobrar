import React from 'react';
import Table from '../Tables/Table';

function PaymentDetailsTable({ paymentDetails, onViewClick}) { // Cambiar paymentDetail a paymentDetails
  const columns = [
    { Header: 'DETALLE ID', accessor: 'paymentDetailId' },
    { Header: 'PAGO ID', accessor: 'paymentId' },
    { Header: 'FACTURA ID', accessor: 'invoiceId' },
    { Header: 'MONTO APLICADO', accessor: 'amountApplied', format: (value) => `$${value.toFixed(2)}` },
    { Header: 'ACCIONES', accessor: 'actions' }
  ];

  const dataIsValid = paymentDetails && Array.isArray(paymentDetails); // Cambiar a paymentDetails directamente
  PaymentDetailsTable.columns = columns;
  return (
    <>
      {dataIsValid ? (
        <Table
        canEdit={false}
  canDelete={false}
  canView={true}
          columns={columns}
          data={paymentDetails} 
          onViewClick={onViewClick}// Cambiar a paymentDetails directamente
          // Aquí puedes añadir otros props si son necesarios
        />
      ) : (
        <p>No hay datos para mostrar.</p> // O algún otro UI de carga o error.
      )}
    </>
  );
}

export default PaymentDetailsTable;
