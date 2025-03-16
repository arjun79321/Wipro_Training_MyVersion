using System.ComponentModel.DataAnnotations;

namespace RestaurantMS.Models
{
    public class Customer
    {
        [Key]
        public int CustId { get; set; }

        [Required]
        [StringLength(30)]
        public string CustName { get; set; }

        [Required]
        [StringLength(30)]
        public string CustUserName { get; set; }

        [Required]
        [StringLength(30)]
        public string CustPassword { get; set; }

        [StringLength(30)]
        public string City { get; set; }

        [StringLength(30)]
        public string State { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string MobileNo { get; set; }
    }
}
