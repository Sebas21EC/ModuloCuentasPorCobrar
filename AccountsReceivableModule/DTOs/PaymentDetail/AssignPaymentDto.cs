using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.DTOs
{
    public class AssignPaymentDto
    {
        public string? PaymentId { get; set; } // ID del pago general
        public List<GetPaymentDetailDto>? PaymentDetails { get; set; } // Lista de detalles de asignación de pagos
    }



}
