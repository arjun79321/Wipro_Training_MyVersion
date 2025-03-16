using System.ComponentModel.DataAnnotations;

namespace RestaurantMS.Models
{
    public class Vendor
    {
        [Key]
        [Required]
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorUserName { get; set; }
        public string VendorPassword { get; set; }
        public string VendorEmail { get; set; }
        public string VendorMobile { get; set; }
    }

}
