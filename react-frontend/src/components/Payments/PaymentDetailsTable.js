import React from 'react';
import CustomTable from '../Tables/CustomTable';

function PaymentDetailsTable({ paymentDetails, onViewClick}) { // Cambiar paymentDetail a paymentDetails
  const columns = [
    { label: 'DETALLE ID', accessor: 'paymentDetailId' },
    { label: 'PAGO ID', accessor: 'paymentId' },
    { label: 'FACTURA ID', accessor: 'invoiceId' },
    { label: 'MONTO APLICADO', accessor: 'amountApplied', format: (value) => `$${value.toFixed(2)}` },
    { label: 'ACCIONES', accessor: 'actions' }
  ];

  const dataIsValid = paymentDetails && Array.isArray(paymentDetails); // Cambiar a paymentDetails directamente

  return (
    <>
      {dataIsValid ? (
        <CustomTable
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
