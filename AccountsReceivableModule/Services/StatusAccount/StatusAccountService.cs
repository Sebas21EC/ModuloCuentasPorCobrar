using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Services
{
    public class StatusAccountService : IStatusAccountService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public StatusAccountService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<StatusAccountDto>> Get(string CustomerId, DateTime startDate, DateTime endDate)
        {
            var serviceResponse = new ServiceResponse<StatusAccountDto>();

            //dame el customer con toodos su paymetns
            try
            {
                var data = await _context.Customers
                    .Where(c => c.CustomerId == CustomerId)
                    .ToListAsync();

                //asignar al data sin el mapper
                serviceResponse.Data = ConvertPaymentToPaymetReportDto(data.FirstOrDefault(), startDate, endDate);
                serviceResponse.Message = "Payment report generated successfully";
                serviceResponse.Success = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;


        }

        public async Task<ServiceResponse<List<StatusAccountDto>>> GetAll()
        {
            var serviceResponse = new ServiceResponse<List<StatusAccountDto>>();

            //dame el customer con toodos su paymetns
            try
            {
                var customers = await _context.Customers
                    .ToListAsync();

                //hacerle List<Customer> a los customer
                var customersList = new List<Customer>();
                foreach (var customer in customers)
                {
                    customersList.Add(customer);
                }

                serviceResponse.Data = ConvertPaymentsToPaymetReportDtos(customersList);
                serviceResponse.Message = "Payment report generated successfully";
                serviceResponse.Success = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        private List<StatusAccountDto> ConvertPaymentsToPaymetReportDtos(List<Customer> customersDta)
        {

            //usa el metodo ConvertPaymentToPaymetReportDto para cada customer con fechas de incio del 2000 y fecha actual del sistema
            var paymentReportDtos = new List<StatusAccountDto>();
            foreach (var customer in customersDta)
            {
                paymentReportDtos.Add(ConvertPaymentToPaymetReportDto(customer, new DateTime(2000, 1, 1), new DateTime(2025,12,12)));
            }
            return paymentReportDtos;

        }


        private StatusAccountDto ConvertPaymentToPaymetReportDto(Customer customerData, DateTime start, DateTime end)
        {            //Obtener el valor de BeginningBalance de todas las Invices pagadas antes de la fecha de inicio
            var beginningBalance = _context.Invoices
                .Where(i => i.CustomerId == customerData.CustomerId && i.InvoiceDate < start)
                .Sum(i => i.AmountPaid);
            //actualializar el valor de BeginningBalance 


            //optener el paymetnId del customerData
            var payments = _context.Payments
                .Where(p => p.CustomerId == customerData.CustomerId && p.PaymentDate >= start && p.PaymentDate <= end)
                .Include(p => p.BankAccount)
                .Include(p => p.Customer)
                .ToList();

            //optener los paymentDetails de cada payment mediante consulta a base de datos
            foreach (var payment in payments)
            {
                var paymentDetails = _context.PaymentDetails
                    .Where(pd => pd.PaymentId == payment.PaymentId)
                    .Include(pd => pd.Invoice)
                    .ToList();

                //agregar los paymentDetails a cada payment
                payment.PaymentDetails = paymentDetails;

                //obtener Invoice mediante InvoiceId de paymetDetais 
                foreach (var paymentDetail in paymentDetails)
                {
                    var invoice = _context.Invoices
                        .Where(i => i.InvoiceId == paymentDetail.InvoiceId)
                        .FirstOrDefault();

                    //agregar la invoice a cada paymentDetail
                    paymentDetail.Invoice = invoice;
                }


            }

            //agregar los payments al customerData
            customerData.Payments = payments;

            //agregar todo manualmente al paymentReport, el mapper no sirve para esto
            // Mapea los datos al objeto PaymentReportDto
            var paymentReportDto = new StatusAccountDto
            {
                Date = DateTime.Now,
                BeginningBalance = beginningBalance,

                Customer = new CustomerDto
                {
                    CustomerId = customerData.CustomerId,
                    CustomerName = customerData.CustomerName,
                    CustomerEmail = customerData.CustomerEmail,
                    CustomerPhone = customerData.CustomerPhone,
                    CustomerAddress = customerData.CustomerAddress,
                    Payments = customerData.Payments.Select(payment => new PaymentDto
                    {
                        PaymentId = payment.PaymentId,
                        PaymentDate = payment.PaymentDate,
                        TotalAmount = payment.PaymentAmount,
                        BankAccount = new BankAccountDto
                        {
                            BankName = payment.BankAccount?.BankName,
                            BankAccountNumber = payment.BankAccount?.BankAccountNumber,
                            AccountType = payment.BankAccount?.BankAccountDetails
                        },
                        PaymentDetails = payment.PaymentDetails.Select(detail => new PaymentDetailDto
                        {
                            InvoiceId = detail.InvoiceId,
                            AmountPaid = detail.AmountApplied,
                            Invoice = new InvoiceDto
                            {
                                InvoiceId = detail.Invoice?.InvoiceId,
                                InvoiceDate = detail.Invoice?.InvoiceDate,
                                InvoiceDetail = detail.Invoice?.InvoiceDetail,
                                AmountDue = detail.Invoice.AmountDue,
                                AmountPaid = detail.Invoice.AmountPaid
                            }
                        }).ToList()
                    }).ToList()
                }
            };




            //hacerle json
            var json = JsonConvert.SerializeObject(paymentReportDto);



            return paymentReportDto;
        }




    }
}
