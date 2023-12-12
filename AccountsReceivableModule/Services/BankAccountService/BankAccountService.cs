using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models;
using AccountsReceivableModule.Models.BankAccount;
using AutoMapper;

namespace AccountsReceivableModule.Services.BankAccountService
{
    public class BankAccountService : IBankAccountService
    {
        private static List<BankAccount> bankAccounts = new List<BankAccount>();

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public BankAccountService(IMapper mapper,DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetBankAccountDto>>> Create(CreateBankAccountDto newBankAccount)
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();
            var bankAccount = _mapper.Map<BankAccount>(newBankAccount);
            bankAccounts.Add(bankAccount);
            serviceResponse.Data = bankAccounts.Select(c => _mapper.Map<GetBankAccountDto>(c)).ToList();
            return serviceResponse;

        }

        public async Task<ServiceResponse<List<GetBankAccountDto>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();
            serviceResponse.Data = bankAccounts.Select(c => _mapper.Map<GetBankAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetBankAccountDto>> GetById(string accountId)
        {
            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            var bankAccount = bankAccounts.FirstOrDefault(x => x.Id == accountId);

            serviceResponse.Data = _mapper.Map<GetBankAccountDto>(bankAccount);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetBankAccountDto>> Update(UpdateBankAccountDto updateBankAccount)
        {

            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            try
            {
                var bankAccount = bankAccounts.FirstOrDefault(x => x.Id == updateBankAccount.Id);

                if (bankAccount == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }
                // _mapper.Map(updateBankAccount, bankAccount);

                bankAccount.Number = updateBankAccount.Number;
                bankAccount.BankName = updateBankAccount.BankName;
                bankAccount.Name = updateBankAccount.Name;
                bankAccount.Details = updateBankAccount.Details;
                bankAccount.Status = updateBankAccount.Status;
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
                var bankAccount = bankAccounts.FirstOrDefault(x => x.Id == accountId);

                if (bankAccount == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Bank Account not found.";
                    return serviceResponse;
                }
                
                bankAccounts.Remove(bankAccount);
                serviceResponse.Data = bankAccounts.Select(c => _mapper.Map<GetBankAccountDto>(c)).ToList();

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