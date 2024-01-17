import React from 'react';
import Table from '../Tables/Table';

function AccountStatusTable({ accountstatus, onEditClick, onDeleteClick, onViewClick }) {
  // Crear una nueva matriz de datos con un pago en cada fila
  const flattenedData = Array.isArray(accountstatus) && accountstatus.length > 0
    ? accountstatus.reduce((acc, account) => {
      // Verificar que cada cuenta tiene un cliente y pagos antes de proceder
      if (account.customer && Array.isArray(account.customer.payments)) {
        const customer = account.customer;
        const payments = customer.payments;

        // Por cada pago, crear una fila de datos
        payments.forEach(payment => {
          const row = {
            date: account.date,
            customerId: customer.customerId,
            customerName: customer.customerName,
            customerEmail: customer.customerEmail,
            customerPhone: customer.customerPhone,
            customerAddress: customer.customerAddress,
            paymentId: payment.paymentId,
            paymentDate: payment.paymentDate,
            totalAmount: payment.totalAmount,
            // Asegúrate de que bankAccount y paymentDetails son objetos antes de acceder a sus propiedades
            bankName: payment.bankAccount?.bankName || '',
            bankAccountNumber: payment.bankAccount?.bankAccountNumber || '',
            accountType: payment.bankAccount?.accountType || '',
            invoiceId: payment.paymentDetails?.[0]?.invoiceId || '',
            amountPaid: payment.paymentDetails?.[0]?.amountPaid || '',
          };
          acc.push(row);
        });
      }
      return acc;
    }, [])
    : []; 
  console.log(flattenedData);
  const columns = [
    { Header: 'Fecha', accessor: 'date' },
    { Header: 'Cliente ID', accessor: 'customerId' },
    { Header: 'Cliente', accessor: 'customerName' },
    { Header: 'Dirección', accessor: 'customerAddress' },
    { Header: 'Payment ID', accessor: 'paymentId' },
    { Header: 'Payment Date', accessor: 'paymentDate' },
    { Header: 'Total Amount', accessor: 'totalAmount' },
    { Header: 'Bank Name', accessor: 'bankName' },
    { Header: 'Invoice ID', accessor: 'invoiceId' },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={flattenedData}
        canEdit={false}
        canDelete={false}
        canView={true}
        onViewClick={onViewClick}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </>
  );
}

export default AccountStatusTable;
