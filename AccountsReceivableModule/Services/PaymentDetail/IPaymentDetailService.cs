using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services
{
    public interface IPaymentDetailService
    {
        Task<ServiceResponse<List<GetPaymentDetailDto>>> Get();
        Task<ServiceResponse<GetPaymentDetailDto>> GetById(int paymentDetailById);
        Task<ServiceResponse<List<GetPaymentDetailDto>>> Create(CreatePaymentDetailDto paymentDetail);
        Task<ServiceResponse<GetPaymentDetailDto>> Update(int paymentDetailId, UpdatePaymentDetailDto paymentDetail);
        Task<ServiceResponse<List<GetPaymentDetailDto>>> Delete(string paymentDetail);
        Task<ServiceResponse<bool>> AssignPaymentToInvoices(string paymentId, List<GetPaymentDetailDto> paymentDetails);

    }
}
