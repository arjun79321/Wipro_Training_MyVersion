using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HospitalMS.Models
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }

        [Required, MaxLength(50)]
        public string PatientName { get; set; }

        [MaxLength(255)]
        public string HealthProblem { get; set; }

        public int? DoctorId { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string MobileNo { get; set; }

        [Range(1, 120)]
        public int Age { get; set; }
    }
}
