using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Models.BankAccount;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services.BankAccountService
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
                var bankAccount = _mapper.Map<BankAccount>(newBankAccount);

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
                var bankAccount = await _context.BankAccounts.FirstOrDefaultAsync(x => x.Id == accountId);

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
                var bankAccount = await _context.BankAccounts.FirstOrDefaultAsync(x => x.Id == accountId);

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


        public async Task<ServiceResponse<GetBankAccountDto>> Update(UpdateBankAccountDto updateBankAccount)
        {
            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            try
            {
                // Buscar la cuenta bancaria por su ID en la base de datos.
                var bankAccount = await _context.BankAccounts.FirstOrDefaultAsync(x => x.Id == updateBankAccount.Id);

                if (bankAccount == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }

                // Actualizar los campos de la cuenta bancaria con los nuevos valores.
                bankAccount.Number = updateBankAccount.Number;
                bankAccount.BankName = updateBankAccount.BankName;
                bankAccount.Name = updateBankAccount.Name;
                bankAccount.Details = updateBankAccount.Details;
                bankAccount.Status = updateBankAccount.Status;

                // Guardar los cambios en la base de datos.
                await _context.SaveChangesAsync();

                // Devolver la cuenta bancaria actualizada en la respuesta.
                serviceResponse.Data = _mapper.Map<GetBankAccountDto>(bankAccount);
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