using System.ComponentModel.DataAnnotations;

namespace BankProject.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Passcode { get; set; }
    }
}
