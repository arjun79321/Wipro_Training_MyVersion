using System.ComponentModel.DataAnnotations;

namespace RestaurantMS.Models
{
    public class Menu
    {
        [Key]
        [Required]
        public int MenuId { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Rating { get; set; }
    }
}
