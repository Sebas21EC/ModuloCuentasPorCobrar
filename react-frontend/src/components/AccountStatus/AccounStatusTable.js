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

  const columns = [
    { Header: "Fecha", accessor: "date" },
    { Header: "Cliente ID", accessor: "customerId" },
    { Header: "Cliente", accessor: "customerName" },
    { Header: "Email", accessor: "customerEmail" },
    { Header: "Teléfono", accessor: "customerPhone" },
    { Header: "Dirección", accessor: "customerAddress" },
    { Header: "Payment ID", accessor: "paymentId" },
    { Header: "Payment Date", accessor: "paymentDate" },
    { Header: "Total Amount", accessor: "totalAmount" },
    { Header: "Bank Name", accessor: "bankName" },
    { Header: "Bank Account Number", accessor: "bankAccountNumber" },
    { Header: "Account Type", accessor: "accountType" },
    { Header: "Invoice ID", accessor: "invoiceId" },
    { Header: "Amount Paid", accessor: "amountPaid" },

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
