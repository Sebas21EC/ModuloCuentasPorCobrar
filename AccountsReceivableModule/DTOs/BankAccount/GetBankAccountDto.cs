using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Models.BankAccount;

namespace AccountsReceivableModule.DTOs.BankAccount
{
    public class GetBankAccountDto
    {
        public string? Id { get; set; }
        public string? Number { get; private set; }
        public string? BankName { get; private set; }
        public string? Name { get; private set; }
        public string? Details { get; private set; }
        public bool Status { get; private set; }

    }
}