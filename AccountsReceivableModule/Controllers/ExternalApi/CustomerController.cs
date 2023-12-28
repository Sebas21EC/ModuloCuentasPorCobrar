using AccountsReceivableModule.DTOs.Customer;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services.CustomerService;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers.ExternalApi
{
    [Route("api/[controller]")]
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


        [HttpGet("customers")]

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
    }
}
