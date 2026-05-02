using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GestionVoitureAPI.Models
{
    public class Client
    {
        [Key]
        public int IdClient { get; set; }

        [Required(ErrorMessage = "Nom obligatoire")]
        public string Nom { get; set; } = string.Empty;

        [Required(ErrorMessage = "Prénom obligatoire")]
        public string Prenom { get; set; } = string.Empty;

        [Required(ErrorMessage = "Téléphone obligatoire")]
        public string Telephone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email obligatoire")]
        [EmailAddress(ErrorMessage = "Email invalide")]
        public string Email { get; set; } = string.Empty;

        // 🔥 relation avec Vente
        [JsonIgnore] // ⚠️ évite boucle infinie JSON
        public List<Vente>? Ventes { get; set; }
    }
}