namespace AccountsReceivableModule.Models
{
    public class PaymentDetail
    {
        public int PaymentDetailId { get; set; }
        public string PaymentId { get; set; }
        public int InvoiceId { get; set; }
        public decimal AmountApplied { get; set; }

        // Relaciones
        public virtual Payment Payment { get; set; }
        public virtual Invoice Invoice { get; set; }
    }
}
