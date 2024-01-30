using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [FunctionAuthorize("AR-LOGIN")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }


        [HttpGet]
        [FunctionAuthorize("AR-INVOICES-READ")]
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
        [FunctionAuthorize("AR-INVOICES-READ")]
        public async Task<ActionResult<ServiceResponse<GetInvoiceDto>>> Get(string id)
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
        [FunctionAuthorize("AR-INVOICES-READ")]
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
        [FunctionAuthorize("AR-INVOICES-READ")]
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
