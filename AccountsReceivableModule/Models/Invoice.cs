using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Models
{
    public class Invoice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? InvoiceId { get; set; }
        public string? CustomerId { get; set; }
        public string? InvoiceDetail { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }

        // Calculated property
        public decimal Balance { get; }

        // Relaciones
        public virtual Customer? Customer { get; set; }
        public virtual ICollection<PaymentDetail>? PaymentDetails { get; set; }
    }
}
