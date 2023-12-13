using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Models.BankAccount;
using AccountsReceivableModule.Services.BankAccountService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService _bankAccountService;

        public BankAccountController(IBankAccountService bankAccountService)
        {
            _bankAccountService = bankAccountService;
        }


        [HttpGet]
        
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Get()
        {
            return Ok(await _bankAccountService.Get());
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> GetById(string accountId)
        {
            var response = await _bankAccountService.GetById(accountId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetBankAccountDto>>>> Create([FromBody] CreateBankAccountDto newBankAccount)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }
            var response = await _bankAccountService.Create(newBankAccount);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPut("{accountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Update([FromBody] UpdateBankAccountDto bankAccount)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }
            var response = await _bankAccountService.Update(bankAccount);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{accountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Delete(string accountId)
        {
            var response = await _bankAccountService.Delete(accountId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


    }
}