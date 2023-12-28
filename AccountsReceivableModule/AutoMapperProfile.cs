using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.DTOs.BankAccount;
using AccountsReceivableModule.DTOs.Customer;
using AccountsReceivableModule.Models;
using AutoMapper;

namespace AccountsReceivableModule
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //BANK ACCOUNT
            CreateMap<BankAccount, GetBankAccountDto>();
            CreateMap<CreateBankAccountDto, BankAccount>();
            CreateMap<UpdateBankAccountDto, BankAccount>();

            //CUSTOMER
            //CreateMap<Customer, GetCustomerDto>() ;
            //CreateMap<CreateCustomerDto, ExternalCustomer>();
            // CreateMap<UpdateCustomerDto, ExternalCustomer>();


            CreateMap<Customer, GetCustomerDto>()
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.name))
                .ForMember(dest => dest.username, opt => opt.MapFrom(src => src.username))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.phone, opt => opt.MapFrom(src => src.phone))
                .ForMember(dest => dest.website, opt => opt.MapFrom(src => src.website));

        }
    }
}