using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IInvoiceService
    {
        //Task<ServiceResponse<List<GetInvoiceDto>>> Create(CreateInvoiceDto newInvoice);
        Task<ServiceResponse<List<GetInvoiceDto>>> GetAll();
        Task<ServiceResponse<GetInvoiceDto>> GetById(string id);
        //Task<ServiceResponse<List<GetInvoiceDto>>> Update(UpdateInvoiceDto updatedInvoice);
        //Task<ServiceResponse<List<GetInvoiceDto>>> Delete(int id);
        //Facturas por cliente
        Task<ServiceResponse<List<GetInvoiceDto>>> GetInvoicesByCustomer(string customerId);
        //facturas por clientes y que el balnace sea mayor a cero
        Task<ServiceResponse<List<GetInvoiceDto>>> GetInvoicesByCustomerAndBalance(string customerId);
    }
}
