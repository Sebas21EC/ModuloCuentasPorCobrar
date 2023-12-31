using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IBankAccountService
    {
        Task<ServiceResponse<List<GetBankAccountDto>>> Get();
        Task<ServiceResponse<GetBankAccountDto>> GetById(string bankAccountId);
        Task<ServiceResponse<List<GetBankAccountDto>>> Create(CreateBankAccountDto bankAccount);
        Task<ServiceResponse<GetBankAccountDto>> Update(string bankAccountId, UpdateBankAccountDto bankAccount);
        Task<ServiceResponse<List<GetBankAccountDto>>> Delete(string bankAccountId);
        
    }
}