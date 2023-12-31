using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IInvoiceService
    {
        //Task<ServiceResponse<List<GetInvoiceDto>>> Create(CreateInvoiceDto newInvoice);
        Task<ServiceResponse<List<GetInvoiceDto>>> GetAll();
        Task<ServiceResponse<GetInvoiceDto>> GetById(int id);
        //Task<ServiceResponse<List<GetInvoiceDto>>> Update(UpdateInvoiceDto updatedInvoice);
        //Task<ServiceResponse<List<GetInvoiceDto>>> Delete(int id);
    }
}
