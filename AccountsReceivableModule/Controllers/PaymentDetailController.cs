using Microsoft.AspNetCore.Http;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountsReceivableModule.Controllers
{
    [Route("api/[controller]")]
    [FunctionAuthorize("AR-LOGIN")]
    [ApiController]
    public class PaymentDetailController : ControllerBase
    {
        private readonly IPaymentDetailService _paymentDetailService;
        public PaymentDetailController(IPaymentDetailService paymentDetailService)
        {
            _paymentDetailService = paymentDetailService;
        }

        [HttpGet]
        [FunctionAuthorize("AR-PAYMENT-DETAIL-READ")]
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
        [FunctionAuthorize("AR-PAYMENT-DETAIL-CREATE")]
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
        [FunctionAuthorize("AR-PAYMENT-DETAIL-CREATE")]
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

        [HttpGet("report/{paymentId}")]
        [FunctionAuthorize("AR-PAYMENT-DETAIL-READ")]

        public async Task<ActionResult<ServiceResponse<PaymentDetailService>>> GetPaymentByIdWithDetailsAndCustumer(string paymentId)
        {
            var response = await _paymentDetailService.GetPaymentByIdWithDetailsAndCustumer(paymentId);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
