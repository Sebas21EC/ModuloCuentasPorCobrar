namespace AccountsReceivableModule.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string CustomerId { get; set; }
        public string InvoiceDetail { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }

        // Calculated property
        public decimal Balance => AmountDue - AmountPaid;

        // Relaciones
        public virtual Customer Customer { get; set; }
        public virtual ICollection<PaymentDetail> PaymentDetails { get; set; }
    }
}
