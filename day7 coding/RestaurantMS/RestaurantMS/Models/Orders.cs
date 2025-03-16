using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantMS.Models
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }

        [ForeignKey("Customer")]
        public int CustId { get; set; }

        [ForeignKey("Menu")]
        public int MenuId { get; set; }

        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        public int QtyOrd { get; set; }

        [Column(TypeName = "numeric(9,2)")]
        public decimal BillAmount { get; set; }

        [StringLength(30)]
        public string OrderStatus { get; set; } = "PENDING";

        [StringLength(30)]
        public string? OrderComments { get; set; }
    }
}
