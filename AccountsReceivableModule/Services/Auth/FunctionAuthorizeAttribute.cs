using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class FunctionAuthorizeAttribute : TypeFilterAttribute
{
    public FunctionAuthorizeAttribute(string function) : base(typeof(FunctionAuthorizationFilter))
    {
        Arguments = new object[] { function };
    }
}

public class FunctionAuthorizationFilter : IAuthorizationFilter
{
    private readonly string _function;

    public FunctionAuthorizationFilter(string function)
    {
        _function = function;
    }


    //[HttpGet]
    //[FunctionAuthorize("-BANK-ACCOUNTS-READ")]
    //public async Task<ActionResult<ServiceResponse<GetBankAccountDto>>> Get()
    //{
    //    var response = await _bankAccountService.Get();
    //    if (response.Data == null)
    //    {
    //        return NotFound(response);
    //    }
    //    return Ok(response);
    //}


    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var authService = context.HttpContext.RequestServices.GetService<IAuthService>();
        var functions = authService.getFunctions();

        //si es nulo o no contiene la funcion
        if (functions == null || !functions.Contains(_function))
        {
            context.Result = new UnauthorizedResult();
        }

        
    }


}
