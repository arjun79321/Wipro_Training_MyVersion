using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using RestaurantMS.Models;


namespace RestaurantMS.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu>().ToTable("Menu");
            modelBuilder.Entity<Vendor>().ToTable("Vendor");
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Orders>().ToTable("Orders");
            modelBuilder.Entity<Wallet>().ToTable("Wallet");
        }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Vendor> Vendor { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Wallet> Wallet { get; set; }

    }
}
