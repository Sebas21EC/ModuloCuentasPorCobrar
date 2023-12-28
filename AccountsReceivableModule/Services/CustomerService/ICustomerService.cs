using AccountsReceivableModule.DTOs.Customer;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services.CustomerService
{
    public interface ICustomerService
    {
        Task<ServiceResponse<List<GetCustomerDto>>> Get();
        Task<ServiceResponse<GetCustomerDto>> GetById(string customerId);
        Task<ServiceResponse<List<GetCustomerDto>>> Create(CreateCustomerDto customer);
        Task<ServiceResponse<GetCustomerDto>> Update(string customerId, UpdateCustomerDto customer);
        //Task<ServiceResponse<List<GetCustomerDto>>> Delete(string customerId);

    }
}
