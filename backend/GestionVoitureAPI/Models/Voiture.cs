using System.ComponentModel.DataAnnotations;

namespace GestionVoitureAPI.Models
{
    public class Voiture
    {
        [Key]
        public int IdVoiture { get; set; }

        public string Matricule { get; set; } = "";
        public string Marque { get; set; } = "";
        public string Couleur { get; set; } = "";
        public string Type { get; set; } = "";
        public decimal Prix { get; set; }
        public string Image { get; set; } = "";

        // 🔥 relation ventes
        public List<Vente>? Ventes { get; set; }
    }
}