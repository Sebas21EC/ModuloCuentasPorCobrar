namespace AccountsReceivableModule.DTOs
{
    public class GetInvoiceDto
    {
        public string? InvoiceId { get; set; }
        public string? CustomerId { get; set; }
        public string? InvoiceDetail { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal Balance { get; }
    }
}
