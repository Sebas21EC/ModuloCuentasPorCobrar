    using AccountsReceivableModule.Models.BankAccount;
    using Microsoft.EntityFrameworkCore;

namespace AccountsReceivableModule.Data;

    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<BankAccount> BankAccounts => Set<BankAccount>();
    }

