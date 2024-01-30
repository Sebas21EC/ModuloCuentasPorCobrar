using AccountsReceivableModule.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [FunctionAuthorize("AR-LOGIN")]
    [ApiController]
    public class AccountStatementController : ControllerBase
    {
        private readonly IAccountStatementService _accountStatementService;
        private readonly IMapper _mapper;

        public AccountStatementController(IAccountStatementService accountStatementService, IMapper mapper)
        {
            _accountStatementService = accountStatementService;
            _mapper = mapper;
        }

        [HttpGet("{CustomerId}/{startDate}/{endDate}")]
        [FunctionAuthorize("AR-STATEMENT-ACCOUNT")]
        public async Task<IActionResult> Get(string CustomerId, DateTime startDate, DateTime endDate)
        {
            var response = await _accountStatementService.Get(CustomerId, startDate, endDate);
            if (response.Success == false)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
