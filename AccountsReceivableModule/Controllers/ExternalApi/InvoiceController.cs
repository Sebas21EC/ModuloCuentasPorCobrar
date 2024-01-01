using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }


        [HttpGet]

        public async Task<ActionResult<ServiceResponse<GetInvoiceDto>>> Get()
        {
            try
            {
                return Ok(await _invoiceService.GetAll());
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetInvoiceDto>>> Get(int id)
        {
            try
            {
                var response = await _invoiceService.GetById(id);
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

        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<ServiceResponse<List<GetInvoiceDto>>>> GetInvoicesByCustomer(string customerId)
        {
            try
            {
                return Ok(await _invoiceService.GetInvoicesByCustomer(customerId));
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("customer/{customerId}/balance")]
        public async Task<ActionResult<ServiceResponse<List<GetInvoiceDto>>>> GetInvoicesByCustomerAndBalance(string customerId)
        {
            try
            {
                return Ok(await _invoiceService.GetInvoicesByCustomerAndBalance(customerId));
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }
    }
}
