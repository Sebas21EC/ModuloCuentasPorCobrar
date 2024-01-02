using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services
{
    public class CustomerService : ICustomerService
    {
        private static List<Customer> customers = new List<Customer>();

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ExternalApiService _externalApiService;


        //public CustomerService(IMapper mapper, DataContext context)
        //{
        //    _mapper = mapper;
        //    _context = context;
        //}

        public CustomerService(IMapper mapper, DataContext context, ExternalApiService externalApiService)
        {
            _mapper = mapper;
            _context = context;
            _externalApiService = externalApiService;
        }

        public Task<ServiceResponse<List<GetCustomerDto>>> Create(CreateCustomerDto customer)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<GetCustomerDto>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<GetCustomerDto>>();

            try
            {
                // Obtén los clientes de la API externa
                var externalCustomers = await _externalApiService.GetCustomersAsync();

                // Mapea los clientes externos a DTOs
                var externalCustomerDtos = _mapper.Map<List<GetCustomerDto>>(externalCustomers);

                // Obtén la cantidad de clientes en la base de datos local
                var localCustomerCount = _context.Customers.Count();

                if (localCustomerCount != externalCustomerDtos.Count)
                {
                    // Si la cantidad es diferente, obtén los IDs de los clientes locales
                    var localCustomerIds = _context.Customers.Select(c => c.CustomerId).ToList();

                    // Encuentra los IDs de clientes nuevos que no están en la base de datos local
                    var newCustomerIds = externalCustomerDtos
                        .Where(ecd => !localCustomerIds.Contains(ecd.CustomerId))
                        .Select(ecd => ecd.CustomerId)
                        .ToList();

                    // Agrega los nuevos registros a la base de datos local
                    var newCustomers = externalCustomers
                        .Where(ec => newCustomerIds.Contains(ec.CustomerId))
                        .Select(ec => _mapper.Map<Customer>(ec))
                        .ToList();

                    _context.Customers.AddRange(newCustomers);

                    await _context.SaveChangesAsync();
                }

                serviceResponse.Data = externalCustomerDtos;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener los clientes: {ex.Message}";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCustomerDto>> GetById(string customerId)
        {
    
            var serviceResponse = new ServiceResponse<GetCustomerDto>();
            try { 
            
                var customer = _context.Customers.Find(customerId);
                if (customer != null)
                {
                    var customerDto = _mapper.Map<GetCustomerDto>(customer);
                    serviceResponse.Data = customerDto;
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Cliente no encontrado.";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error al obtener el cliente: {ex.Message}";
            }
            return serviceResponse;
        
        }

        public Task<ServiceResponse<GetCustomerDto>> Update(string customerId, UpdateCustomerDto customer)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<GetInvoiceDto>>> GetInvoicesByCustomer(string customerId)
        {
            var serviceResponse = new ServiceResponse<List<GetInvoiceDto>>();

            try
            {

                //obetner todas las facturas del cliente
                var invoices = await _context.Invoices
                    .Where(i => i.CustomerId == customerId)
                    .ToListAsync();

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
