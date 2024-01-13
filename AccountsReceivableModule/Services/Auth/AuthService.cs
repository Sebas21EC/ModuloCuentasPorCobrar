using AccountsReceivableModule.Models;
using Microsoft.AspNetCore.Identity.Data;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Sockets;
using System.Text;

namespace AccountsReceivableModule.Services
{
    // AuthService.cs
    public class AuthService : IAuthService
    {
        private readonly HttpClient _httpClient;
        private string _token;
        private List<string> _functions;
        private readonly string? _loginApiUrl;


        public AuthService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _token = string.Empty;
            _loginApiUrl = configuration["ExternalApiSettings:LoginApi"];
        }

        //get y set token
        public string getToken()
        {
            return _token;
        }

        public void setToken(string token)
        {
            _token = token;
        }

        public List<string> getFunctions()
        {
            return _functions;
        }


        public async Task<ServiceResponse<AuthResponse>> Login(AuthRequest authRequestNew)
        {
            var authRequest = new
            {
                username = authRequestNew.Username,
                password = authRequestNew.Password
            };

            // Serializar el objeto a JSON
            var jsonRequest = JsonConvert.SerializeObject(authRequest);

            // Crear el contenido de la solicitud
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            // Realizar la solicitud POST
            var response = await _httpClient.PostAsync(_loginApiUrl, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            // Deserializar la respuesta
            var externalResponse = JsonConvert.DeserializeObject<AuthResponse>(responseContent);

            if (response.IsSuccessStatusCode)
            {

                var userData = new AuthResponse
                {
                    Token = externalResponse.Token,
                    Username = externalResponse.Username,
                    Email = externalResponse.Email,
                    Functions = externalResponse.Functions
                };

                _token = externalResponse.Token;
                _functions = externalResponse.Functions.ToList();
                return new ServiceResponse<AuthResponse>
                {
                    Data = externalResponse,
                    Success = true,
                    Message = "Success"
                };
            }
            else
            {
                return new ServiceResponse<AuthResponse>
                {
                    Data = externalResponse,
                    Success = false,
                    Message = "Error"
                };
            }
        }

        //Logout
        public async Task<ServiceResponse<AuthResponse>> Logout()
        {
            //vaciar todas las variables, y hacer logout en el api
            _token = string.Empty;
            _functions = new List<string>();
            return new ServiceResponse<AuthResponse>
            {
                //MENSAJE DE SESION CERRADA
                Success = true,
                Message = "Success, sessión cerrada",
                Data= null
                
                
            };

        }


    }

}
