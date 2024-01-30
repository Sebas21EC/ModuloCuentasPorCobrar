import React from "react";
import Table from "../Tables/Table";

function AccountStatusTable({
  accountstatus,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) {
  // Crear una nueva matriz de datos con un pago en cada fila
  const flattenedData = accountstatus.reduce((acc, account) => {
    const customer = account.customer;
    const payments = customer.payments;

    // Por cada pago, crear una fila de datos
    payments.forEach((payment, index) => {
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
        bankName: payment.bankAccount.bankName,
        bankAccountNumber: payment.bankAccount.bankAccountNumber,
        accountType: payment.bankAccount.accountType,
      };

      if (payment.paymentDetails.length > 0) {
        const detailPayment = payment.paymentDetails[0];
        row.invoiceId = detailPayment.invoiceId;
        row.amountPaid = detailPayment.amountPaid;
      }

      acc.push(row);


    });

    return acc;
  }, []);


function AccountStatusTable({ accountstatus, onViewClick }) {
  const flattenedData = accountstatus && accountstatus.statement
    ? accountstatus.statement.map(statementItem => ({
        date: statementItem.date,
        customerId: accountstatus.customer.customerId,
        customerName: accountstatus.customer.customerName,
        customerAddress: accountstatus.customer.customerAddress,
        customerEmail: accountstatus.customer.customerEmail,
        customerPhone: accountstatus.customer.customerPhone,
        type: statementItem.type,
        id: statementItem.id,
        debe: statementItem.debe,
        haber: statementItem.haber,
      }))
    : [];

  const columns = [
    { Header: 'Fecha', accessor: 'date' },
    { Header: 'Cliente ID', accessor: 'customerId' },
    { Header: 'Cliente', accessor: 'customerName' },
    { Header: 'Dirección', accessor: 'customerAddress' },
    { Header: 'Email', accessor: 'customerEmail' },
    { Header: 'Teléfono', accessor: 'customerPhone' },
    { Header: 'Tipo', accessor: 'type' },
    { Header: 'ID', accessor: 'id' },
    { Header: 'Debe', accessor: 'debe' },
    { Header: 'Haber', accessor: 'haber' },
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

      />
    </>
  );
}

export default AccountStatusTable;
