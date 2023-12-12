using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Models.BankAccount;

namespace AccountsReceivableModule.DTOs.BankAccount
{
    public class CreateBankAccountDto
    {

    public string Id { get; set; }
    public string Number { get; set; }
    public string BankName { get; set; }
    public string Name { get; set; }
    public string Details { get; set; }
    public bool Status { get; set; }
    }
}