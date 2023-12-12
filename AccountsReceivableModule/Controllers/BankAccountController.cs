using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Models.BankAccount;
using AccountsReceivableModule.Services.BankAccountService;
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
        public  async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Get()
        {
            return Ok(await _bankAccountService.Get());
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> GetById(string accountId)
        {
            return Ok(await _bankAccountService.GetById(accountId));
        }

        [HttpPost]
        public  async Task<ActionResult<ServiceResponse<List<GetBankAccountDto>>>> Create([FromBody] CreateBankAccountDto newBankAccount)
        {
           
            return Ok(await _bankAccountService.Create(newBankAccount));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Update([FromBody] UpdateBankAccountDto bankAccount)
        {
            return Ok(await _bankAccountService.Update(bankAccount));
        }

        [HttpDelete("{accountId}")]
        public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Delete(string accountId)
        {
            return Ok(await _bankAccountService.Delete(accountId));
        }

    }
}