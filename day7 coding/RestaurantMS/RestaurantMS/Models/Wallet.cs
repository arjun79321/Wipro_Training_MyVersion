using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantMS.Models
{
    public class Wallet
    {
        [Key]
        public int WalletId { get; set; }

        [Required]
        public int CustId { get; set; }

        [Required]
        [StringLength(30)]
        public string WalletType { get; set; }

        [Required]
        [Column(TypeName = "numeric(9,2)")]
        public decimal WalletAmount { get; set; }

        // Establish relationship with Customer
        [ForeignKey("CustId")]
        public Customer Customer { get; set; }
    }
}
