using AccountsReceivableModule.Data;
using AccountsReceivableModule.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAutoMapper(typeof(Program).Assembly);
        //Inyección de dependencias de los modelos de servicios
        builder.Services.AddScoped<IBankAccountService, BankAccountService>();
        builder.Services.AddScoped<ICustomerService, CustomerService>();
        builder.Services.AddScoped<IInvoiceService, InvoiceService>();
        builder.Services.AddScoped<IPaymentService, PaymentService>();
        builder.Services.AddScoped<IPaymentDetailService, PaymentDetailService>();

        builder.Services.AddHttpClient<ExternalApiService>();
        builder.Services.AddSingleton<ExternalApiService>();


        // Configura el HttpClient
        builder.Services.AddHttpClient<AuthService>();
        // Registra AuthService como un servicio
        builder.Services.AddScoped<AuthService>();


    //    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //.AddJwtBearer(options =>
    //{
    //    options.Authority = "https://localhost:7002/api/Auth/login"; // URL de la API externa que emite los tokens
    //    options.Audience = "MiAppWeb"; // Puede ser el identificador de tu propia aplicación
    //});





        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin() // En producción, considera restringir esto a orígenes específicos.
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("Content-Disposition"));
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseCors("CorsPolicy");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();


        //app.UseEndpoints(endpoints =>
        //{
        //    endpoints.MapControllers();
        //});

        app.Run();

    }
}