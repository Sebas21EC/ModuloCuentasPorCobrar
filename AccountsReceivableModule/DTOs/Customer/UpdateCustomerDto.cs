using Newtonsoft.Json;

namespace AccountsReceivableModule.DTOs.Customer
{
    public class UpdateCustomerDto
    {
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerAddress { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerStatus { get; set; }
    }
}
