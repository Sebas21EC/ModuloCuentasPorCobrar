using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountsReceivableModule.Models
{
    public class BankAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? BankAccountId { get; set; }
        public string? BankAccountNumber { get;  set; }
        public string? BankName { get;  set; }
        public string? BankAccountName { get;  set; }
        public string? BankAccountDetails { get;  set; }
        public bool BankAccountStatus { get;  set; }

        // Relación con Payments
        public virtual ICollection<Payment> Payments { get; set; }
    }
}