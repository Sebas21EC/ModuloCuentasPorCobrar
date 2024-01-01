using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services
{
    public class BankAccountService : IBankAccountService
    {
        private static List<BankAccount> bankAccounts = new List<BankAccount>();

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public BankAccountService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetBankAccountDto>>> Create(CreateBankAccountDto newBankAccount)
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();

            try
            {
                // Generar el nuevo ID en el formato deseado
                string newAccountId = GenerateNewAccountId();

                var bankAccount = _mapper.Map<BankAccount>(newBankAccount);
                bankAccount.BankAccountId = newAccountId;

                _context.BankAccounts.Add(bankAccount);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.BankAccounts
                    .Select(c => _mapper.Map<GetBankAccountDto>(c))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        // Función para generar el nuevo ID en el formato "CTA-BAN-001", "CTA-BAN-002", etc.
        private string GenerateNewAccountId()
        {
            // Consulta la base de datos para obtener el último ID creado
            var lastBankAccount = _context.BankAccounts.OrderByDescending(b => b.BankAccountId).FirstOrDefault();

            if (lastBankAccount != null)
            {
                // Obtén el número del último ID y aumenta en uno
                int lastNumber = int.Parse(lastBankAccount.BankAccountId.Split('-').Last());
                int newNumber = lastNumber + 1;

                // Formatea el nuevo ID
                return $"CTA-BAN-{newNumber:D3}";
            }
            else
            {
                // Si no hay cuentas bancarias en la base de datos, comienza desde "CTA-BAN-001"
                return "CTA-BAN-001";
            }
        }



        public async Task<ServiceResponse<List<GetBankAccountDto>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();
            var dbBankAccounts = await _context.BankAccounts.ToListAsync();
            serviceResponse.Data = dbBankAccounts.Select(c => _mapper.Map<GetBankAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetBankAccountDto>> GetById(string accountId)
        {
            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            try
            {
                var bankAccount = await _context.BankAccounts.FirstOrDefaultAsync(x => x.BankAccountId == accountId);

                if (bankAccount == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }

                serviceResponse.Data = _mapper.Map<GetBankAccountDto>(bankAccount);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }



        public async Task<ServiceResponse<List<GetBankAccountDto>>> Delete(string accountId)
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();

            try
            {
                var bankAccount = await _context.BankAccounts.FirstOrDefaultAsync(x => x.BankAccountId == accountId);

                if (bankAccount == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }

                _context.BankAccounts.Remove(bankAccount);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.BankAccounts
                    .Select(c => _mapper.Map<GetBankAccountDto>(c))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }


        public async Task<ServiceResponse<GetBankAccountDto>> Update(string accountId, UpdateBankAccountDto updateBankAccount)
        {
            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            try
            {
                // Buscar la cuenta bancaria por su ID en la base de datos.
                var bankAccountToUpdate = await _context.BankAccounts.FirstOrDefaultAsync(x => x.BankAccountId == accountId);

                if (bankAccountToUpdate == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }

                // Actualizar los campos de la cuenta bancaria con los nuevos valores.
                bankAccountToUpdate.BankAccountNumber = updateBankAccount.BankAccountNumber;
                bankAccountToUpdate.BankName = updateBankAccount.BankName;
                bankAccountToUpdate.BankAccountName = updateBankAccount.BankAccountName;
                bankAccountToUpdate.BankAccountDetails = updateBankAccount.BankAccountDetails;
                bankAccountToUpdate.BankAccountStatus = updateBankAccount.BankAccountStatus;

                // Guardar los cambios en la base de datos.
                await _context.SaveChangesAsync();

                // Volver a cargar la entidad desde la base de datos para obtener la versión actualizada.
                // Esto asegura que los cambios se apliquen correctamente en la entidad.
                await _context.Entry(bankAccountToUpdate).ReloadAsync();

                // Devolver la cuenta bancaria actualizada en la respuesta.
                serviceResponse.Data = _mapper.Map<GetBankAccountDto>(bankAccountToUpdate);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }




    }
}