using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalMS.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; }

        [Required, MaxLength(50)]
        public string DoctorName { get; set; }

        [Required , MaxLength(30)]
        public string Speciality { get; set; } 

        [Required, MaxLength(50)]
        public string Qualification { get; set; }

        [Required, MaxLength(30)]
        public string DoctorUserName { get; set; }

        [Required]
        public string DoctorPassword { get; set; } // Store hashed password

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string Mobile { get; set; }

        public ICollection<Patient> Patients { get; set; } = new List<Patient>();
    }
}
