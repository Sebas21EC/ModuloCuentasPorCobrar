using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.DTOs.BankAccount
{
    public class CreateBankAccountDto
    {
    public string? BankAccountNumber { get; set; }
    public string? BankName { get; set; }
    public string? BankAccountName { get; set; }
    public string? BankAccountDetails { get; set; }
    public bool BankAccountStatus { get; set; }
    }
}