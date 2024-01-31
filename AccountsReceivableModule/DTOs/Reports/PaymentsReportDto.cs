namespace AccountsReceivableModule.DTOs
{
    public class PaymentsReportDto
    {
        public string? PaymentId { get; set; }
        public GetCustomerDto? Customer { get; set; }
        public string? PaymentDetail { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool IsPrinted { get; set; }
        public List<GetPaymentDetailDto> PaymentDetails { get; set; } = new List<GetPaymentDetailDto>();

    }

}
