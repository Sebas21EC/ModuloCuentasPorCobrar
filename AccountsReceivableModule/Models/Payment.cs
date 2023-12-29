using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountsReceivableModule.Models
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? PaymentId { get; set; }
        public string? CustomerId { get; set; }
        public string? BankAccountId { get; set; }
        public string? PaymentDetail { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool IsPrinted { get; set; }

        // Relaciones
        public virtual BankAccount? BankAccount { get; set; }
        public virtual Customer? Customer { get; set; }
        public virtual ICollection<PaymentDetail>? PaymentDetails { get; set; }
    }
}
