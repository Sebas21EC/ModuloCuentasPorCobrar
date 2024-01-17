using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetPaymentDto>>>> Get()
        {
            return Ok(await _paymentService.GetAll());
        }

        [HttpGet("{paymentId}")]
        public async Task<ActionResult<ServiceResponse<GetPaymentDto>>> GetById(string paymentId)
        {
            var response = await _paymentService.GetById(paymentId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetPaymentDto>>>> Create([FromBody] CreatePaymentDto newPayment)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }

            var response = await _paymentService.Create(newPayment);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPut("{paymentId}")]
        public async Task<ActionResult<ServiceResponse<GetPaymentDto>>> Update(string paymentId, [FromBody] UpdatePaymentDto updatedPayment)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }

            var response = await _paymentService.Update(paymentId, updatedPayment);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        //[HttpDelete("{paymentId}")]
        //public async Task<ActionResult<ServiceResponse<List<GetPaymentDto>>>> Delete(string paymentId)
        //{
        //    var response = await _paymentService.Delete(paymentId);
        //    if (response.Data == null)
        //    {
        //        return NotFound(response);
        //    }
        //    return Ok(response);
        //}

        [HttpGet("client/{clientId}/{startDate}/{endDate}")]
        public async Task<ActionResult<ServiceResponse<List<GetPaymentDto>>>> GetByClientAndDate(string clientId, DateTime startDate, DateTime endDate)
        {
            var response = await _paymentService.GetByClientAndDate(clientId, startDate, endDate);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
