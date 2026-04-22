using System.ComponentModel.DataAnnotations;

namespace GestionVoitureAPI.Models
{
    public class Client
    {
        [Key]
        public int IdClient { get; set; }

        public string Nom { get; set; } = "";
        public string Prenom { get; set; } = "";
        public string Telephone { get; set; } = "";
        public string Email { get; set; } = "";

        // 🔥 relation (important pour ventes)
        public List<Vente>? Ventes { get; set; }
    }
}