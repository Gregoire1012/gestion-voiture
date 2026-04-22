using System.ComponentModel.DataAnnotations;

namespace GestionVoitureAPI.Models
{
    public class Vente
    {
        [Key]
        public int IdVente { get; set; }

        public DateTime Date_Vente { get; set; }

        public decimal Montant { get; set; }

        // 🔥 FOREIGN KEYS
        public int IdClient { get; set; }
        public Client? Client { get; set; }

        public int IdVoiture { get; set; }
        public Voiture? Voiture { get; set; }
    }
}