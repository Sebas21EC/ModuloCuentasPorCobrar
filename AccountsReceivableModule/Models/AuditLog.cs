using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountsReceivableModule.Models
{
    public class AuditLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AuditId { get; set; }
        public string? UserId { get; set; }
        public string? Action { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Detail { get; set; }
    }
}
