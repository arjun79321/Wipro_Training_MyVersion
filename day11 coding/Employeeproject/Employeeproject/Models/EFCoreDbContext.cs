using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using EmployeeProject.Models;

namespace EmployeeProject.Models
{
    public class EFCoreDbContext : DbContext
    {
        public EFCoreDbContext(DbContextOptions<EFCoreDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<LeaveHistory>().ToTable("LeaveHistory");

            
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<LeaveHistory> LeaveHistory { get; set; }

    }
}
