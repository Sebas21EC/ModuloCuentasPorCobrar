import React from "react";

function BankAccountTable({
  bankAccounts,
  onEditClick,
  onDeleteClick, // Elimina "= { handleDeleteClick }"
}) {
  return (
    <table className="table table-dark" align="center">
      {/* Encabezados de tabla */}
      <tbody>
        {bankAccounts.map((bankAccount) => (
          <tr key={bankAccount.id}>
            {/* Celdas de datos */}
            <td>{bankAccount.bankAccountId}</td>
            <td>{bankAccount.bankAccountNumber}</td>
            <td>{bankAccount.bankName}</td>
            <td>{bankAccount.bankAccountName}</td>
            <td>{bankAccount.bankAccountDetails}</td>
            <td>{bankAccount.bankAccountStatus ? "Active" : "Inactive"}</td>
            <td>
              {/* Botones de Editar y Eliminar */}
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => onEditClick(bankAccount)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDeleteClick(bankAccount)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BankAccountTable;
