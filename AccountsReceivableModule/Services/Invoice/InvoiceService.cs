using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ExternalApiService _externalApiService;

        public InvoiceService(IMapper mapper, DataContext context, ExternalApiService externalApiService)
        {
            _mapper = mapper;
            _context = context;
            _externalApiService = externalApiService;
        }

        public decimal GetTotalAmountDue(ExternalInvoice externalInvoices)
        {
            //recibo el invoice y calculo el amount due
            decimal amountDue = 0;
            foreach (var invoiceDetailes in externalInvoices.Details)
            {
                amountDue += invoiceDetailes.TotalAmount + (invoiceDetailes.TotalAmount * (invoiceDetailes.Iva / 100));
            }
            return amountDue;
        }

        private List<Invoice> MapExternalInvoicesToInvoices(List<ExternalInvoice> externalInvoices)
        {
            var invoices = new List<Invoice>();

            foreach (var externalInvoice in externalInvoices)
            {
                var invoice = new Invoice
                {
                    InvoiceId = externalInvoice.InvoiceId,
                    CustomerId = externalInvoice.Customer.CustomerId,
                    InvoiceDetail = externalInvoice.PaytName,
                    //encviar en cada iteracion el invice para calcular el amount due
                    AmountDue = GetTotalAmountDue(externalInvoice),
                    AmountPaid = 0
                };

                invoices.Add(invoice);
            }

            return invoices;
        }

        public async Task<ServiceResponse<List<GetInvoiceDto>>> GetAll()
        {
            var serviceResponse = new ServiceResponse<List<GetInvoiceDto>>();

            try
            {
                var externalInvoices = await _externalApiService.GetInvoicesAsync();

                var transformedInvoices = MapExternalInvoicesToInvoices(externalInvoices);

                var externalInvoiceDtos = _mapper.Map<List<GetInvoiceDto>>(transformedInvoices);

                var localInvoiceCount = _context.Invoices.Count();

                if (localInvoiceCount != externalInvoiceDtos.Count)
                {
                    var localInvoiceIds = await _context.Invoices.Select(i => i.InvoiceId).ToListAsync();

                    var newInvoiceIds = externalInvoiceDtos
                        .Where(eid => !localInvoiceIds.Contains(eid.InvoiceId))
                        .Select(eid => eid.InvoiceId)
                        .ToList();

                    var newInvoices = transformedInvoices
                        .Where(ei => newInvoiceIds.Contains(ei.InvoiceId))
                        .Select(ei => _mapper.Map<Invoice>(ei))
                        .ToList();

                    _context.Invoices.AddRange(newInvoices);
                    await _context.SaveChangesAsync();
                }

                serviceResponse.Data = externalInvoiceDtos;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener las facturas: {ex.Message}";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetInvoiceDto>> GetById(int id)
        {
            var serviceResponse = new ServiceResponse<GetInvoiceDto>();

            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                if (invoice != null)
                {
                    var invoiceDto = _mapper.Map<GetInvoiceDto>(invoice);
                    serviceResponse.Data = invoiceDto;
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Factura no encontrada.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener la factura: {ex.Message}";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetInvoiceDto>>> GetInvoicesByCustomer(string customerId)
        {
            var serviceResponse = new ServiceResponse<List<GetInvoiceDto>>();

            try
            {

                //busqueda por id customer y que ek balance sea mayor a cero
                var invoices = await _context.Invoices.Where(i => i.CustomerId == customerId).ToListAsync();

                serviceResponse.Data = _mapper.Map<List<GetInvoiceDto>>(invoices);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener las facturas: {ex.Message}";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetInvoiceDto>>> GetInvoicesByCustomerAndBalance(string customerId)
        {
            var serviceResponse = new ServiceResponse<List<GetInvoiceDto>>();

            try
            {

                //busqueda por id customer y que ek balance sea mayor a cero
                var invoices = await _context.Invoices.Where(i => i.CustomerId == customerId && (i.Balance > (decimal)(0.0))).ToListAsync();

                serviceResponse.Data = _mapper.Map<List<GetInvoiceDto>>(invoices);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener las facturas: {ex.Message}";
            }

            return serviceResponse;
        }
    }
}
