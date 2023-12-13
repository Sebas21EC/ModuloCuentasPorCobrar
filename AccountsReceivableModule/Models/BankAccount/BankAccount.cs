using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountsReceivableModule.Models.BankAccount
{
    public class BankAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; set; }
        public string? Number { get;  set; }
        public string? BankName { get;  set; }
        public string? Name { get;  set; }
        public string? Details { get;  set; }
        public bool Status { get;  set; }
    }
}