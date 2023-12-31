using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountsReceivableModule.Models
{
    public class PaymentDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentDetailId { get; set; }
        public string? PaymentId { get; set; }
        public string? InvoiceId { get; set; }
        public decimal AmountApplied { get; set; }

        // Relaciones
        public virtual Payment? Payment { get; set; }
        public virtual Invoice? Invoice { get; set; }
    }
}
