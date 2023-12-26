using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.DTOs.BankAccount
{
    public class GetBankAccountDto
    {
        public string? BankAccountId { get; set; }
        public string? BankAccountNumber { get; private set; }
        public string? BankName { get; private set; }
        public string? BankAccountName { get; private set; }
        public string? BankAccountDetails { get; private set; }
        public bool BankAccountStatus { get; private set; }

    }
}