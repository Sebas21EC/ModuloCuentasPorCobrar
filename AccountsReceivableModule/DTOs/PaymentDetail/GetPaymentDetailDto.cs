namespace AccountsReceivableModule.DTOs
{
    public class GetPaymentDetailDto
    {
        public int PaymentDetailId { get; set; }
        public string? PaymentId { get; set; }
        public string? InvoiceId { get; set; }
        public decimal AmountApplied { get; set; }
    }
}
