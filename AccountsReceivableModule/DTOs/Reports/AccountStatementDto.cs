namespace AccountsReceivableModule.DTOs
{
    public class AccountStatementDto
    {
        public DateTime? Date { get; set; }
        public GetCustomerDto? Customer { get; set; }
        public decimal BeginningBalance { get; set; }=0;
        public decimal Subtotal { get; set; }=0;
        public decimal EndingBalance { get; set; } = 0;
        public List<AccountStatementTable>? Statement { get; set; }

    }

    public class AccountStatementTable
    {
        public string? Type { get; set; }
        public string? Id { get; set; }
        public DateTime? Date { get; set; }
        public decimal Debe { get; set; } = 0;
        public decimal Haber { get; set; } = 0;

    }
}
