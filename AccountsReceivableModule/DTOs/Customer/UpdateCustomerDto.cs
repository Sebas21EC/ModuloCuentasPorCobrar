namespace AccountsReceivableModule.DTOs.Customer
{
    public class UpdateCustomerDto
    {
        public string CustomerId { get; set; }
        public string? name { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? address { get; set; }
        public string? phone { get; set; }
        public string? website { get; set; }
        public string? company { get; set; }
    }
}
