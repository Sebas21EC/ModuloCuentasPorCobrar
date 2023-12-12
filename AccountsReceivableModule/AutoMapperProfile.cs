using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.Models.BankAccount;
using AutoMapper;

namespace AccountsReceivableModule
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BankAccount, GetBankAccountDto>();
            CreateMap<CreateBankAccountDto, BankAccount>();
        }
    }
}