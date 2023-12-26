namespace AccountsReceivableModule.Models
{
    public class AuditLog
    {
        public int AuditId { get; set; }
        public string UserId { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }
        public string Detail { get; set; }
    }
}
