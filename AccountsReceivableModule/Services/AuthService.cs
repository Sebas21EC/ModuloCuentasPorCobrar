using AccountsReceivableModule.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;

namespace AccountsReceivableModule.Services
{
    // AuthService.cs
    public class AuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private string _token ; // Variable para almacenar el token JWT.


        public AuthService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        //get y set token
        public string Token
        {
            get { return _token; }
            set { _token = value; }
        }


        public async Task<string> LoginAsync(string username, string password)
        {
            // Realiza una solicitud PUT para iniciar sesión y obtener el token JWT.
            // Aquí debes enviar las credenciales a la API externa y procesar la respuesta para obtener el token JWT.
            // Luego, devuelve el token JWT.
            // Nota: Asegúrate de manejar errores y excepciones aquí.
            if (!string.IsNullOrEmpty(_token))
            {
                return _token;
            }

            var loginModel = new
            {
                Username = username,
                Password = password
            };

            var jsonContent = JsonConvert.SerializeObject(loginModel);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://localhost:7002/api/Auth/login", httpContent);

            if (response.IsSuccessStatusCode)
            {
                _token = await response.Content.ReadAsStringAsync();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);

                return _token; // Esto asume que el token se encuentra en la propiedad AccessToken del objeto TokenResponse.
            }

            // Maneja los errores de autenticación aquí.

            return null;
        }
    }

}
