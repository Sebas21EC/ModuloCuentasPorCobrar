import React from "react";
import Table from "../Tables/Table";
const formatDate = (value) => {
  const dateObject = new Date(value);
  return dateObject.toISOString().split('T')[0]; // Esto devolverá 'YYYY-MM-DD'
};

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
    { Header: 'Fecha', accessor: 'date' ,Cell: ({ value }) => formatDate(value)},
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
        canPrint={false}
        onViewClick={onViewClick}

      />
    </>
  );
}

export default AccountStatusTable;
