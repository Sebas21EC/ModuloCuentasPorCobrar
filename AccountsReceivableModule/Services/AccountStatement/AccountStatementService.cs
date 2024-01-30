using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services
{
    public class AccountStatementService : IAccountStatementService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AccountStatementService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;


        }

        public async Task<ServiceResponse<AccountStatementDto>> Get(string CustomerId, DateTime startDate, DateTime endDate)
        {
            var response = new ServiceResponse<AccountStatementDto>();
            try
            {
                var customers = await _context.Customers
                   .Where(c => c.CustomerId == CustomerId)
                   .ToListAsync();


                decimal amountPaidInvoices = await _context.Invoices.Where(i => i.CustomerId == CustomerId && i.InvoiceDate < startDate).SumAsync(i => i.AmountDue);

                decimal amountPayments = await _context.Payments.Where(p => p.CustomerId == CustomerId && p.PaymentDate < startDate).SumAsync(p => p.PaymentAmount);
           
                decimal beginningBalance = amountPaidInvoices - amountPayments;

                //Obtener los pagos entre las fechas proporcionadas desde la base de datos
                var payments = _context.Payments.Where(p => p.CustomerId == CustomerId && p.PaymentDate >= startDate && p.PaymentDate <= endDate).ToList();

                //Obtener las facturas entre las fechas proporcionadas
                var invoices = _context.Invoices.Where(i => i.CustomerId == CustomerId && i.InvoiceDate >= startDate && i.InvoiceDate <= endDate).ToList();


                response.Data = ConvertPaymentToPaymetReportDto(customers.FirstOrDefault(), startDate, endDate, beginningBalance, payments, invoices);
                response.Message = "Account statement generated successfully";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;

            }
            return response;
        }

        private  AccountStatementDto ConvertPaymentToPaymetReportDto(Customer customer, DateTime startDate, DateTime endDate, decimal beginningBalance,List<Payment> payments,List<Invoice>  invoices)
        {
            var accountStatementDto = new AccountStatementDto();


            accountStatementDto.BeginningBalance = beginningBalance;

            //DEBE

            //            

            //                                          DEBE         HABER
            //PAGO          PAG-005     12/01/2021      1000
            //FACTURA       00-0008     15/01/2021                  1000
            //PAGO          PAG-006     17/01/2021      2000
            //FACTURA       00-0009     19/01/2021                  2000
            //PAGO          PAG-007     20/01/2021      3000

            //SUBTOTAL = 1000 + 2000 + 3000 = 6000-3000 = 3000

            //Ahora vamos a generar un lista de AccountStatementTable para luego ordenarlas por fechas, para tener un lsitado similar al ejemplode la tabla, los valores debemos consultar en la tabla de la base de datos entre las fechas proporcionadas.
            List<AccountStatementTable> accountStatementTables = new List<AccountStatementTable>();

            ////Obtener los pagos entre las fechas proporcionadas desde la base de datos
            //var payments = _context.Payments.Where(p => p.CustomerId == customer.CustomerId && p.PaymentDate >= startDate && p.PaymentDate <= endDate).ToList();

            ////Obtener las facturas entre las fechas proporcionadas
            //var invoices = _context.Invoices.Where(i => i.CustomerId == customer.CustomerId && i.InvoiceDate >= startDate && i.InvoiceDate <= endDate).ToList();

            //Recorrer los pagos y agregarlos a la lista de AccountStatementTable
            foreach (var payment in payments)
            {
                var accountStatementTable = new AccountStatementTable();
                accountStatementTable.Type = "Payment";
                accountStatementTable.Id = payment.PaymentId;
                accountStatementTable.Date = payment.PaymentDate;
                accountStatementTable.Debe = 0;
                accountStatementTable.Haber = payment.PaymentAmount;
                accountStatementTables.Add(accountStatementTable);
            }

            //Recorrer las facturas y agregarlas a la lista de AccountStatementTable
            foreach (var invoice in invoices)
            {
                var accountStatementTable = new AccountStatementTable();
                accountStatementTable.Type = "Invoice";
                accountStatementTable.Id = invoice.InvoiceId;
                accountStatementTable.Date = invoice.InvoiceDate;
                accountStatementTable.Debe = invoice.AmountDue ;
                accountStatementTable.Haber = 0;
                accountStatementTables.Add(accountStatementTable);
            }

            //Ordenar la lista de AccountStatementTable por fecha
            accountStatementTables = accountStatementTables.OrderBy(a => a.Date).ToList();

            //Agregar la lista de AccountStatementTable a la propiedad Statement de AccountStatementDto
            accountStatementDto.Statement = accountStatementTables;

            //Recorrer la lista de AccountStatementTable para calcular el subtotal
            decimal debe = 0;
            decimal haber = 0;
            foreach (var accountStatementTable in accountStatementTables)
            {
                debe += accountStatementTable.Debe;
                haber += accountStatementTable.Haber;
            }

            //Calcular el subtotal (debe - haber)
            accountStatementDto.Subtotal = debe - haber;

            //Calcular el endingBalance (beginningBalance + subtotal)
            accountStatementDto.EndingBalance = beginningBalance + accountStatementDto.Subtotal;

            //Agregar el customer a la propiedad Customer de AccountStatementDto con el mapper
            accountStatementDto.Customer = _mapper.Map<GetCustomerDto>(customer);




            return accountStatementDto;
        }
    }
}
