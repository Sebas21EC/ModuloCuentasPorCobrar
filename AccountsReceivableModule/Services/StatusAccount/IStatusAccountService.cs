using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IStatusAccountService
    {
        Task<ServiceResponse<StatusAccountDto>> Get(string CustomerId, DateTime startDate, DateTime endDate);
        Task<ServiceResponse<List<StatusAccountDto>>> GetAll();
    }
}
