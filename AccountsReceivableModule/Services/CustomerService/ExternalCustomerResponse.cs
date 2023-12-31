using AccountsReceivableModule.Models;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Services
{
    public class ExternalCustomerResponse
    {
        [JsonProperty("message")]
        public string? Message { get; set; }

        [JsonProperty("customers")]
        public List<Customer>? Customers { get; set; }
    }
}
