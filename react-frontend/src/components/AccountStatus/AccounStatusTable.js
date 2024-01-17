import React from 'react';
import Table from '../Tables/Table';

function AccountStatusTable({ accountstatus, onEditClick, onDeleteClick, onViewClick }) {
    console.log(accountstatus.data);
  const columns = [
    // { Header: 'CÓDIGO', accessor: 'paymentId' },
    // { Header: 'CLIENTE ID', accessor: 'customerId' },
    // { Header: 'CLIENTE', accessor: 'customerName' },
    // {
    //   Header: 'CUENTA BANCARIA',
    //   accessor: (row) =>
    //     `${row.bankAccount.bankName} - ${row.bankAccount.bankAccountNumber} - ${row.bankAccount.accountType}`,
    // },
    // { Header: 'MONTO', accessor: 'totalAmount' },
    { Header: 'FECHA', accessor: 'date' },
  ];


  return (
    <>
        <Table
          columns={columns}
          data={accountstatus}
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
