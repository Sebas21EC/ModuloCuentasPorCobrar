namespace AccountsReceivableModule.DTOs
{
    public class GetPaymentDto
    {
        public string? PaymentId { get; set; }
        public string? CustomerId { get; set; }
        public string? BankAccountId { get; set; }
        public string? PaymentDetail { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool IsPrinted { get; set; }

    //    //opcioales
    //    public GetBankAccountDto? BankAccount { get; set; }
    //    public List<GetPaymentDetailDto>? PaymentDetails { get; set; } = new List<GetPaymentDetailDto>();
    }
}
