using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EmployeeProject.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [Required]
        public string EmployName { get; set; }

        public int? MgrId { get; set; }  // Nullable, because the top-level manager has no manager.

        public int LeaveAvail { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Mobile { get; set; }

        // *Self-referential relationship (Self-Join)*
        [ForeignKey("MgrId")]
        public Employee Manager { get; set; }  // Navigational Property
    }
}