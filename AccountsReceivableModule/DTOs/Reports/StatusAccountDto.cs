namespace AccountsReceivableModule.DTOs
{
    public class StatusAccountDto
    {
        public DateTime? Date { get; set; }
        public CustomerDto? Customer { get; set; }
    }

    public class CustomerDto
    {
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerAddress { get; set; }
        public List<PaymentDto> Payments { get; set; } = new List<PaymentDto>();
    }

    public class PaymentDto
    {
        public string? PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal TotalAmount { get; set; }
        public BankAccountDto BankAccount { get; set; } = new BankAccountDto();
        public List<PaymentDetailDto> PaymentDetails { get; set; } = new List<PaymentDetailDto>();
    }

    public class BankAccountDto
    {
        public string? BankName { get; set; }
        public string? BankAccountNumber { get; set; }
        public string? AccountType { get; set; }
    }

    public class PaymentDetailDto
    {
        public string? InvoiceId { get; set; }
        public decimal AmountPaid { get; set; }
    }

    // Clases DTO existentes sin cambios
}
