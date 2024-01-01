using Microsoft.AspNetCore.Http;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailController : ControllerBase
    {
        private readonly IPaymentDetailService _paymentDetailService;
        public PaymentDetailController(IPaymentDetailService paymentDetailService)
        {
            _paymentDetailService = paymentDetailService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetPaymentDetailDto>>>> Get()
        {
            return Ok(await _paymentDetailService.Get());
        }

        //[HttpGet("{paymentDetailId}")]
        //public async Task<ActionResult<ServiceResponse<GetPaymentDetailDto>>> GetById(string paymentDetailId)
        //{
        //    var response = await _paymentDetailService.GetById(paymentDetailId);
        //    if (response.Data == null)
        //    {
        //        return NotFound(response);
        //    }
        //    return Ok(response);
        //}

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetPaymentDetailDto>>>> Create([FromBody] CreatePaymentDetailDto newPaymentDetail)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error 400 Bad Request con mensajes de validación
                return BadRequest(ModelState);
            }

            var response = await _paymentDetailService.Create(newPaymentDetail);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignPaymentToInvoices([FromBody] AssignPaymentDto assignPaymentDto)
        {
            var response = await _paymentDetailService.AssignPaymentToInvoices(assignPaymentDto.PaymentId, assignPaymentDto.PaymentDetails);

            if (response.Success)
            {
                return Ok(response.Data);
            }
            else
            {
                return BadRequest(response.Message);
            }
        }
    }
}
