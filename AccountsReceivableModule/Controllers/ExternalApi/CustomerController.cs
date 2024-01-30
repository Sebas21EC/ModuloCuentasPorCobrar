using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers.ExternalApi
{
    [Route("api/[controller]")]
    [FunctionAuthorize("AR-LOGIN")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        //private readonly ExternalApiService _externalApiService;

        //public CustomerController(ExternalApiService externalApiService)
        //{
        //    _externalApiService = externalApiService;
        //}

        //[HttpGet("customers")]
        //public async Task<IActionResult> GetCustomers()
        //{
        //    try
        //    {
        //        var customers = await _externalApiService.GetCustomersAsync();
        //        // Procesa los datos de los clientes según lass necesidades
        //        return Ok(customers);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Manejo de errores 
        //        return StatusCode(500, ex.Message);
        //    }
        //}

        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }


        [HttpGet]
        [FunctionAuthorize("AR-CUSTOMERS-READ")]
        public async Task<ActionResult<ServiceResponse<GetCustomerDto>>> Get()
        {
            try { 
            return Ok(await _customerService.Get());
                }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{id}")]
        [FunctionAuthorize("AR-CUSTOMERS-READ")]
        public async Task<ActionResult<ServiceResponse<GetCustomerDto>>> Get(string id)
        {
            try
            {
                var response = await _customerService.GetById(id);
                if (response.Data == null)
                {
                    return NotFound(response);
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("invoices/{customerId}")]
        [FunctionAuthorize("AR-CUSTOMERS-READ")]
        public async Task<ActionResult<ServiceResponse<List<GetInvoiceDto>>>> GetInvoicesByCustomer(string customerId)
        {
            try
            {
                return Ok(await _customerService.GetInvoicesByCustomer(customerId));
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }

    }
}
