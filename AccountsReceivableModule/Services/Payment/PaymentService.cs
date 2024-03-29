﻿using AccountsReceivableModule.Data;
using AccountsReceivableModule.DTOs;
using AccountsReceivableModule.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Services;
public class PaymentService : IPaymentService
{
    private static List<Payment> payments = new List<Payment>();

    private readonly IMapper _mapper;
    private readonly DataContext _context;
    public PaymentService(IMapper mapper, DataContext context)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<List<GetPaymentDto>>> Create(CreatePaymentDto newPayment)
    {
        var serviceResponse = new ServiceResponse<List<GetPaymentDto>>();
        try
        {
            string newPaymentId = GenerateNewPaymentId();

            var payment = _mapper.Map<Payment>(newPayment);
            payment.PaymentId = newPaymentId;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Payments
                .Select(c => _mapper.Map<GetPaymentDto>(c))
                .ToListAsync();
            serviceResponse.Message = "Payment created successfully.";
            return serviceResponse;
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    private string GenerateNewPaymentId()
    {
        // Consulta la base de datos para obtener el último ID creado
        var lastPayment = _context.Payments.OrderByDescending(b => b.PaymentId).FirstOrDefault();

        if (lastPayment != null)
        {
            // Obtén el número del último ID y aumenta en uno
            int lastNumber = int.Parse(lastPayment.PaymentId.Split('-').Last());
            int newNumber = lastNumber + 1;

            // Formatea el nuevo ID
            return $"PAG-CLI-{newNumber:D5}";
        }
        else
        {
            // Si no hay cuentas bancarias en la base de datos, comienza desde "CTA-BAN-001"
            return "PAG-CLI-00001";
        }
    }

    public Task<ServiceResponse<List<GetPaymentDto>>> Delete(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<List<GetPaymentDto>>> GetAll()
    {
       var response = new ServiceResponse<List<GetPaymentDto>>();
        try
        {
            var dbPayments = await _context.Payments.ToListAsync();
            response.Data = dbPayments.Select(c => _mapper.Map<GetPaymentDto>(c)).ToList();
            response.Message = "Payment list successfully.";
            response.Success = true;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ServiceResponse<GetPaymentDto>> GetById(string id)
    {
       var response = new ServiceResponse<GetPaymentDto>();
        try
        {
            var dbPayment = _context.Payments.FirstOrDefault(c => c.PaymentId == id);
            response.Data = _mapper.Map<GetPaymentDto>(dbPayment);
            response.Message = "Payment list successfully.";
            response.Success = true;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }
        return response;
    }

    public async Task<ServiceResponse<GetPaymentDto>> Update(string paymetId, UpdatePaymentDto updatedPayment)
    {

        var response = new ServiceResponse<GetPaymentDto>();
        try
        {
            //bucar el payment por su id
            var dbPayment = _context.Payments.FirstOrDefault(c => c.PaymentId == paymetId);

            if(dbPayment == null)
            {
                response.Success = false;
                response.Message = "Payment not found.";
                return response;
            }

            //actualiza los campos de payment
            dbPayment.PaymentDate = updatedPayment.PaymentDate;
            dbPayment.CustomerId = updatedPayment.CustomerId;
            dbPayment.BankAccountId = updatedPayment.BankAccountId;
            dbPayment.PaymentDetail = updatedPayment.PaymentDetail;
            dbPayment.PaymentAmount = updatedPayment.PaymentAmount;
            dbPayment.IsPrinted = updatedPayment.IsPrinted;

            //guarda los cambios
            await _context.SaveChangesAsync();

            await _context.Entry(dbPayment).ReloadAsync();


            response.Data = _mapper.Map<GetPaymentDto>(dbPayment);
            response.Success = true;
            response.Message = "Payment updated successfully.";
            return response;


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = "Ocurrio un error :(";
            return response;
        }

    }

    public async Task<ServiceResponse<List<GetPaymentDto>>> GetByClientAndDate(string clientId, DateTime startDate, DateTime endDate)
    {
       //tambine vamos a devolver los datos del PaymetDetail
        var response = new ServiceResponse<List<GetPaymentDto>>();
        try
        {
            var dbPayments = await _context.Payments
                .Include(c => c.PaymentDetails)
                .Where(c => c.CustomerId == clientId && c.PaymentDate >= startDate && c.PaymentDate <= endDate)
                .ToListAsync();
            response.Data = dbPayments.Select(c => _mapper.Map<GetPaymentDto>(c)).ToList();
            response.Message = "Payment list successfully.";
            response.Success = true;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }
        return response;
    }
}

