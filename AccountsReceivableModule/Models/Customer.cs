using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public string? CustomerId { get; set; }
        public string? name { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? website { get; set; }

        // Relaciones
        public virtual ICollection<Invoice>? Invoices { get; set; }
        public virtual ICollection<Payment>? Payments { get; set; }
    }
}
