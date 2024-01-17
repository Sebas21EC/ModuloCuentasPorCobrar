using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusAccountController : ControllerBase
    {
       
        private readonly IStatusAccountService _statusAccountDtoService;

        public StatusAccountController(IStatusAccountService statusAccountDtoService)
        {
            _statusAccountDtoService = statusAccountDtoService;
        }

        [HttpGet("{CustomerId}/{startDate}/{endDate}")]
        public async Task<ActionResult<ServiceResponse<StatusAccountDto>>> Get(string CustomerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                return Ok(await _statusAccountDtoService.Get(CustomerId, startDate, endDate));
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<StatusAccountDto>>>> GetAll()
        {
            try
            {
                return Ok(await _statusAccountDtoService.GetAll());
            }
            catch (Exception ex)
            {
                // Manejo de errores 
                return StatusCode(500, ex.Message);
            }
        }

    }
}
