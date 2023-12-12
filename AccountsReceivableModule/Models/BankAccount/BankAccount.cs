namespace AccountsReceivableModule.Models.BankAccount
{
    public class BankAccount
    {
        public BankAccountId? Id { get; set; }
        public string? Number { get; private set; }
        public string? BankName { get; private set; }
        public string? Name { get; private set; }
        public string? Details { get; private set; }
        public bool Status { get; private set; }
    }
}