using AccountsReceivableModule.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace AccountsReceivableModule.Services
{
    public interface IAuthService
    {
        Task<ServiceResponse<AuthResponse>> Login(AuthRequest authRequest);
        Task<ServiceResponse<AuthResponse>> Logout();
        List<string> getFunctions();
    }
}
