using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IAccountStatementService
    {

         Task<ServiceResponse<AccountStatementDto>> Get(string CustomerId, DateTime startDate, DateTime endDate);
        //async

    }
}
