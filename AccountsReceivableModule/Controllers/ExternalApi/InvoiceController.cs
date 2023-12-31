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
    }
}
