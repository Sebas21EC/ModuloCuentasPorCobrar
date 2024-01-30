using AccountsReceivableModule.Models;

namespace AccountsReceivableModule.DTOs
{
    public class StatusAccountDto
    {
        public DateTime? Date { get; set; }
        public CustomerDto? Customer { get; set; }
        public decimal? BeginningBalance { get; set; }
        public decimal? EndingBalance { get; set; }
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
        public InvoiceDto? Invoice { get; set; }
        public decimal AmountPaid { get; set; }
    }

    public class InvoiceDto
    {
        public string? InvoiceId { get; set; }
        public string? CustomerId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string? InvoiceDetail { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }
    }
}
