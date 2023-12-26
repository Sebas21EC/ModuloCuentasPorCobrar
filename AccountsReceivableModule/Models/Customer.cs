namespace AccountsReceivableModule.Models
{
    public class Customer
    {
        public string CustomerId { get; set; }
        public string CustomerDetail { get; set; }

        // Relaciones
        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
