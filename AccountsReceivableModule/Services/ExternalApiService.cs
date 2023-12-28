using AccountsReceivableModule.Models;
using Newtonsoft.Json;


namespace AccountsReceivableModule.Services
{
    public class ExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _invoiceApiUrl;
        private readonly string _customerApiUrl;

        public ExternalApiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _invoiceApiUrl = configuration["ExternalApiSettings:InvoiceApi"];
            _customerApiUrl = configuration["ExternalApiSettings:CustomerApi"];
        }

        //public async Task<List<InvoiceModel>> GetInvoicesAsync()
        //{
        //    var response = await _httpClient.GetAsync(_invoiceApiUrl);

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync();
        //        var invoices = JsonConvert.DeserializeObject<List<InvoiceModel>>(content);
        //        return invoices;
        //    }

        //    // Maneja errores adecuadamente
        //    throw new HttpRequestException($"Error: {response.StatusCode}");
        //}

        //public async Task<string> GetCustomersAsync()
        //{
        //    var response = await _httpClient.GetAsync(_customerApiUrl);

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync();
        //        return content;
        //    }

        //    // Handle errors appropriately
        //    throw new HttpRequestException($"Error: {response.StatusCode}");
        //}

        //customer
        public async Task<List<Customer>> GetCustomersAsync()
        {
            var response = await _httpClient.GetAsync(_customerApiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                //var customers = JsonConvert.DeserializeObject<List<Customer>>(content);
                //vonversion manual de solo los datos que se necesitan
                var customers = JsonConvert.DeserializeObject<List<Customer>>(content);
                
                return customers;
            }

            // Handle errors appropriately
            throw new HttpRequestException($"Error: {response.StatusCode}");
        }
    }
}
