using AccountsReceivableModule.Models;
using AccountsReceivableModule.Services;
using Newtonsoft.Json;


namespace AccountsReceivableModule.Services
{
    public class ExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string? _invoiceApiUrl;
        private readonly string? _customerApiUrl;

        public ExternalApiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _invoiceApiUrl = configuration["ExternalApiSettings:InvoiceApi"];
            _customerApiUrl = configuration["ExternalApiSettings:CustomerApi"];
        }

        public async Task<List<ExternalInvoice>> GetInvoicesAsync()
        {
            var response = await _httpClient.GetAsync(_invoiceApiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                // Deserializar la respuesta como ExternalCustomerResponse
                var externalResponse = JsonConvert.DeserializeObject<ExternalInvoiceResponse>(content);

                // Verificar si la respuesta fue exitosa (Message es "Success") y si hay datos en Customers
                if (externalResponse.Message == "Success" && externalResponse.Invoices != null)
                {
                    // Los datos de clientes están en externalResponse.Customers
                    var invoices = externalResponse.Invoices;
                    return invoices;
                }
                else
                {
                    // Manejar caso de respuesta exitosa pero sin datos o respuesta fallida
                    // Aquí puedes decidir cómo manejar este escenario, lanzar una excepción o devolver una lista vacía, por ejemplo.
                    throw new HttpRequestException("Error en la respuesta del servicio.");
                }
            }

            // Handle errors appropriately
            throw new HttpRequestException($"Error: {response.StatusCode}");
        }




        //customer
        public async Task<List<Customer>> GetCustomersAsync()
        {
            var response = await _httpClient.GetAsync(_customerApiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                // Deserializar la respuesta como ExternalCustomerResponse
                var externalResponse = JsonConvert.DeserializeObject<ExternalCustomerResponse>(content);

                // Verificar si la respuesta fue exitosa (Message es "Success") y si hay datos en Customers
                if (externalResponse.Message == "Success" && externalResponse.Customers != null)
                {
                    // Los datos de clientes están en externalResponse.Customers
                    var customers = externalResponse.Customers;
                    return customers;
                }
                else
                {
                    // Manejar caso de respuesta exitosa pero sin datos o respuesta fallida
                    // Aquí puedes decidir cómo manejar este escenario, lanzar una excepción o devolver una lista vacía, por ejemplo.
                    throw new HttpRequestException("Error en la respuesta del servicio.");
                }
            }

            // Handle errors appropriately
            throw new HttpRequestException($"Error: {response.StatusCode}");
        }
    }
}
