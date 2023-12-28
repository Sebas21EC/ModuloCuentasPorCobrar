using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers.ExternalApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly ExternalApiService _externalApiService;

        public InvoiceController(ExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        //[HttpGet("invoices")]
        //public async Task<IActionResult> GetInvoices()
        //{
        //    try
        //    {
        //       // var invoices = await _externalApiService.GetInvoicesAsync();
        //        // Procesa los datos de las facturas según lass necesidades
        //        return Ok(invoices);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Manejo de errores 
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }
}
