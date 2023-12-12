using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public BankAccountService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetBankAccountDto>>> Create(CreateBankAccountDto newBankAccount)
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();
            var bankAccount = _mapper.Map<BankAccount>(newBankAccount);
            bankAccount.Id = BankAccountId.Create();
            bankAccounts.Add(bankAccount);
            serviceResponse.Data = bankAccounts.Select(c=>_mapper.Map<GetBankAccountDto>(c)).ToList();
            return serviceResponse;

        }

        public async Task<ServiceResponse<List<GetBankAccountDto>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<GetBankAccountDto>>();
            serviceResponse.Data = bankAccounts.Select(c=>_mapper.Map<GetBankAccountDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetBankAccountDto>> GetById(string accountId)
        {
            var serviceResponse = new ServiceResponse<GetBankAccountDto>();

            var bankAccount = bankAccounts.FirstOrDefault(x => x.Id == new BankAccountId(accountId));
            
            serviceResponse.Data = _mapper.Map<GetBankAccountDto>(bankAccount);
            return serviceResponse;
        }

        public Task<ServiceResponse<GetBankAccountDto>> Update(UpdateBankAccountDto bankAccount)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetBankAccountDto>> Delete(string accountId)
        {
            throw new NotImplementedException();
        }



    }
}