namespace AccountsReceivableModule.DTOs.BankAccount
{
    public class UpdateBankAccountDto
    {
        public string? BankAccountId { get; set; }
        public string? BankAccountNumber { get;  set; }
        public string? BankName { get;  set; }
        public string? BankAccountName { get;  set; }
        public string? BankAccountDetails { get;  set; }
        public bool BankAccountStatus { get;  set; }

    }
}