using AccountsReceivableModule.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<BankAccount> BankAccounts => Set<BankAccount>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<PaymentDetail> PaymentDetails => Set<PaymentDetail>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Aquí se configuran las relaciones y otras configuraciones específicas del modelo
        modelBuilder.Entity<Payment>()
            .HasOne(p => p.BankAccount)
            .WithMany(b => b.Payments)
            .HasForeignKey(p => p.BankAccountId);

        modelBuilder.Entity<Payment>()
            .HasOne(p => p.Customer)
            .WithMany(c => c.Payments)
            .HasForeignKey(p => p.CustomerId);

        modelBuilder.Entity<Invoice>()
            .HasOne(i => i.Customer)
            .WithMany(c => c.Invoices)
            .HasForeignKey(i => i.CustomerId);

        modelBuilder.Entity<PaymentDetail>()
            .HasOne(pd => pd.Payment)
            .WithMany(p => p.PaymentDetails)
            .HasForeignKey(pd => pd.PaymentId);

        modelBuilder.Entity<PaymentDetail>()
            .HasOne(pd => pd.Invoice)
            .WithMany(i => i.PaymentDetails)
            .HasForeignKey(pd => pd.InvoiceId);
    }


}

