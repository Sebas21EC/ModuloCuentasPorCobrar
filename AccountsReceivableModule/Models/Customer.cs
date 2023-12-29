using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("cus_dni")]
        public string? CustomerId { get; set; }
        [JsonProperty("cus_name")]
        public string? CustomerName { get; set; }
        [JsonProperty("cus_address")]
        public string? CustomerAddress { get; set; }
        [JsonProperty("cus_phone")]
        public string? CustomerPhone { get; set; }
        [JsonProperty("cus_email")]
        public string? CustomerEmail { get; set; }
        [JsonProperty("cus_status")]
        public string? CustomerStatus { get; set; }

        // Relaciones
        public virtual ICollection<Invoice>? Invoices { get; set; }
        public virtual ICollection<Payment>? Payments { get; set; }
    }
}
