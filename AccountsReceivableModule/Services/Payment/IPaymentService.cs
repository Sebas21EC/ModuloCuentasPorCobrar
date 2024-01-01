using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.Services;
public interface IPaymentService
{
    Task<ServiceResponse<List<GetPaymentDto>>> Create(CreatePaymentDto newPayment);
    Task<ServiceResponse<List<GetPaymentDto>>> GetAll();
    Task<ServiceResponse<GetPaymentDto>> GetById(string id);
    Task<ServiceResponse<GetPaymentDto>> Update(string paymetId,UpdatePaymentDto updatedPayment);
    Task<ServiceResponse<List<GetPaymentDto>>> Delete(string id);

    //obtner los pagos por clientes y en fechas establecida (fecha incio y fecha fin)
    Task<ServiceResponse<List<GetPaymentDto>>> GetByClientAndDate(string clientId, DateTime startDate, DateTime endDate);

}

