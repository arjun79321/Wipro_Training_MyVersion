using Microsoft.EntityFrameworkCore;

namespace CMS.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Wallet>().ToTable("Wallet");


        }
        public DbSet<Customer> Customer { get; set; }
            modelBuilder.Entity<Wallet>().ToTable("Wallet");
        public DbSet<Wallet> Wallet { get; set; }

    }
}
