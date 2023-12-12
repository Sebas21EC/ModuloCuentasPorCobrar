using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Models.BankAccount;

namespace AccountsReceivableModule.Services.BankAccountService
{
    public interface IBankAccountService
    {
        Task<ServiceResponse<List<GetBankAccountDto>>> Get();
        Task<ServiceResponse<GetBankAccountDto>> GetById(string accountId);
        Task<ServiceResponse<List<GetBankAccountDto>>> Create(CreateBankAccountDto bankAccount);

        Task<ServiceResponse<GetBankAccountDto>> Update(UpdateBankAccountDto bankAccount);

        Task<ServiceResponse<List<GetBankAccountDto>>> Delete(string accountId);
        
    }
}