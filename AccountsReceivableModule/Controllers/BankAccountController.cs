using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [ApiController]
    //[FunctionAuthorize("AR-LOGIN")]
    [Route("api/[controller]")]
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService _bankAccountService;

        public BankAccountController(IBankAccountService bankAccountService)
        {
            _bankAccountService = bankAccountService;
        }


        [HttpGet]
        //[FunctionAuthorize("AR-BANK-ACCOUNTS-READ")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Get()
        {
            try { 
                var response = await _bankAccountService.Get();
                if (response.Data == null)
                {
                    return NotFound(response);
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized("Usuario no autenticado");
            }
        }

        [FunctionAuthorize("AR-BANK-ACCOUNTS-READ")]
        [HttpGet("{bankAccountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> GetById(string bankAccountId)
        {
            var response = await _bankAccountService.GetById(bankAccountId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


        [HttpPost]
        [FunctionAuthorize("AR-BANK-ACCOUNTS-CREATE")]
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




        [HttpPut("{bankAccountId}")]
        [FunctionAuthorize("AR-BANK-ACCOUNTS-UPDATE")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Update(string bankAccountId, [FromBody] UpdateBankAccountDto bankAccount)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }

            var response = await _bankAccountService.Update(bankAccountId, bankAccount);

            if (response.Data == null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        [HttpDelete("{bankAccountId}")]
        [FunctionAuthorize("AR-BANK-ACCOUNTS-DELETE")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Delete(string bankAccountId)
        {
            var response = await _bankAccountService.Delete(bankAccountId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


    }
}