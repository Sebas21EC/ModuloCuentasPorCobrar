namespace AccountsReceivableModule.DTOs
{
    public class CreatePaymentDetailDto
    {
       // public int PaymentDetailId { get; set; }
        public string? PaymentId { get; set; }
        public string? InvoiceId { get; set; }
        public decimal AmountApplied { get; set; }
    }
}
