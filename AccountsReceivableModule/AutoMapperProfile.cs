using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountsReceivableModule.DTOs;
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
            CreateMap<Customer, GetCustomerDto>();
            CreateMap<Customer, CustomerDto>();
            

            //INvoice
            CreateMap<Invoice, GetInvoiceDto>();

            //PAYMENT
            CreateMap<Payment, GetPaymentDto>();
            CreateMap<CreatePaymentDto, Payment>();
            CreateMap<UpdatePaymentDto, Payment>();

            //PaymentDetail
            CreateMap<PaymentDetail, GetPaymentDetailDto>();
            CreateMap<CreatePaymentDetailDto, PaymentDetail>();
            CreateMap<UpdatePaymentDetailDto, PaymentDetail>();

            //PaymentReport
            CreateMap<StatusAccountDto, StatusAccountDto>();


        }
    }
}