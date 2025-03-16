using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeProject.Models
{
    public class LeaveHistory
    {
        [Key]
        public int LeaveId { get; set; } 
        [ForeignKey("Employee")]
        public int EmpId { get; set; }  
        public DateTime LeaveStartDate { get; set; }
        public DateTime LeaveEndDate { get; set; }   
        public int? NoOfDays { get; set; }  
        public string LeaveStatus { get; set; } = "PENDING"; 
        public string LeaveReason { get; set; } 
        public string? ManagerComments { get; set; } 
    }
}
