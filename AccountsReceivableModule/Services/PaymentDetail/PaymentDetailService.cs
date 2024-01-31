using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services
{
    public class PaymentDetailService : IPaymentDetailService
    {
        private static List<PaymentDetail> paymentDetails = new List<PaymentDetail>();

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PaymentDetailService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetPaymentDetailDto>>> Create(CreatePaymentDetailDto newPaymentDetail)
        {
            var serviceResponse = new ServiceResponse<List<GetPaymentDetailDto>>();
            try
            {

                var paymentDetail = _mapper.Map<PaymentDetail>(newPaymentDetail);

                _context.PaymentDetails.Add(paymentDetail);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.PaymentDetails
                    .Select(c => _mapper.Map<GetPaymentDetailDto>(c))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }



        public async Task<ServiceResponse<bool>> AssignPaymentToInvoices(string paymentId, List<GetPaymentDetailDto> paymentDetails)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var payment = await _context.Payments.Include(p => p.PaymentDetails).FirstOrDefaultAsync(p => p.PaymentId == paymentId);

                if (payment == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "El pago no fue encontrado.";
                    return serviceResponse;
                    //DEVOLVER UN MENSAJE DE QUE NO SE ENCUENTRA LA FACCTURA Y QUE VUELVA A REPETIRSE EL CICLO.

                }

                foreach (var paymentDetailDto in paymentDetails)
                {
                    var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.InvoiceId == paymentDetailDto.InvoiceId);

                    if (invoice == null)
                    {
                        // Maneja la lógica para facturas no encontradas
                        // continue;
                        serviceResponse.Success = false;
                        serviceResponse.Message = "La factura no fue encontrada.";
                        return serviceResponse;

                    }

                    if (invoice.Balance >= paymentDetailDto.AmountApplied)
                    {
                        // Crea un nuevo detalle de pago y asigna valores
                        var paymentDetail = new PaymentDetail
                        {
                            PaymentId = payment.PaymentId,
                            InvoiceId = invoice.InvoiceId,
                            AmountApplied = paymentDetailDto.AmountApplied
                        };

                        // Agrega el detalle de pago al contexto
                        _context.PaymentDetails.Add(paymentDetail);

                        // Actualiza el saldo de la factura y el monto pagado
                        invoice.AmountPaid += paymentDetailDto.AmountApplied;
                        //invoice.AmountDue -= paymentDetailDto.AmountApplied;
                    }
                    else
                    {
                        // Maneja la lógica para montos aplicados superiores al saldo de la factura
                        //continue;
                        serviceResponse.Success = false;
                        serviceResponse.Message = "El monto aplicado es superior al valor de la factura.";
                        return serviceResponse;
                    }
                }

                // Actualiza el monto total del pago general
                // payment.PaymentAmount -= paymentDetails.Sum(pd => pd.AmountApplied);

                await _context.SaveChangesAsync();
                serviceResponse.Data = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }



        public Task<ServiceResponse<List<GetPaymentDetailDto>>> Delete(string paymentDetail)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<GetPaymentDetailDto>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<GetPaymentDetailDto>>();
            try
            {
                var paymentDetails = await _context.PaymentDetails.ToListAsync();
                serviceResponse.Data = paymentDetails.Select(c => _mapper.Map<GetPaymentDetailDto>(c)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetPaymentDetailDto>> GetById(int paymentDetailById)
        {
            var serviceResponse = new ServiceResponse<GetPaymentDetailDto>();
            try
            {
                var paymentDetail = paymentDetails.FirstOrDefault(c => c.PaymentDetailId == paymentDetailById);
                serviceResponse.Data = _mapper.Map<GetPaymentDetailDto>(paymentDetail);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public Task<ServiceResponse<GetPaymentDetailDto>> Update(int paymentDetailId, UpdatePaymentDetailDto paymentDetail)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<PaymentsReportDto>> GetPaymentByIdWithDetailsAndCustumer(string paymentId)
        {
            //obtner el pago con sus detalles y el customer
            var response = new ServiceResponse<PaymentsReportDto>();
            try
            {
                var payment = _context.Payments
                    .Where(p => p.PaymentId == paymentId);

                var paymentDetails = _context.PaymentDetails
                    .Where(pd => pd.PaymentId == paymentId);

                //customer con el id que tiene el pago
                var customer = _context.Customers
                    .Where(c => c.CustomerId == payment.FirstOrDefault().CustomerId);

                response.Data = ConvertPaymentToPaymetReportDto(payment.FirstOrDefault(), paymentDetails.ToList(), customer.FirstOrDefault());
                response.Message = "Payment report generated successfully";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;

        }

        private PaymentsReportDto ConvertPaymentToPaymetReportDto(Payment payment, List<PaymentDetail> paymentDetails, Customer customer)
        {
            var varPaymentsReportDto = new PaymentsReportDto();

            
            varPaymentsReportDto.PaymentId = payment.PaymentId;
            varPaymentsReportDto.PaymentDetail = payment.PaymentDetail;
            varPaymentsReportDto.PaymentAmount = payment.PaymentAmount;
            varPaymentsReportDto.PaymentDate = payment.PaymentDate;
            varPaymentsReportDto.IsPrinted = payment.IsPrinted;

            //customer
            varPaymentsReportDto.Customer = new GetCustomerDto
            {
                CustomerId = customer.CustomerId,
                CustomerName = customer.CustomerName,
                CustomerAddress = customer.CustomerAddress,
                CustomerPhone = customer.CustomerPhone,
                CustomerEmail = customer.CustomerEmail
            };

            //paymentDetails
            foreach (var paymentDetail in paymentDetails)
            {
                varPaymentsReportDto.PaymentDetails.Add(new GetPaymentDetailDto
                {
                    PaymentDetailId = paymentDetail.PaymentDetailId,
                    PaymentId = paymentDetail.PaymentId,
                    InvoiceId = paymentDetail.InvoiceId,
                    AmountApplied = paymentDetail.AmountApplied
                });
            }


            return varPaymentsReportDto;
        }
    }
}
