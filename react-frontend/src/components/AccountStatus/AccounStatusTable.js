import React from "react";
import Table from "../Tables/Table";

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
