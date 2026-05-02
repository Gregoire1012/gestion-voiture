using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionVoitureAPI.Data;
using GestionVoitureAPI.Models;

namespace GestionVoitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentesController(AppDbContext context)
        {
            _context = context;
        }

        // ================= GET ALL =================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vente>>> Get()
        {
            var ventes = await _context.Ventes
                .Include(v => v.Client)   // 🔥 relation client
                .Include(v => v.Voiture) // 🔥 relation voiture
                .ToListAsync();

            return Ok(ventes);
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<ActionResult<Vente>> GetById(int id)
        {
            var vente = await _context.Ventes
                .Include(v => v.Client)
                .Include(v => v.Voiture)
                .FirstOrDefaultAsync(v => v.IdVente == id);

            if (vente == null)
                return NotFound();

            return Ok(vente);
        }

        // ================= POST =================
        [HttpPost]
        public async Task<ActionResult<Vente>> Post([FromBody] Vente vente)
        {
            // 🔥 VALIDATION
            if (vente == null)
                return BadRequest("Données invalides");

            if (vente.IdClient == 0 || vente.IdVoiture == 0)
                return BadRequest("Client et Voiture sont obligatoires");

            // 🔥 calcul automatique montant côté backend (sécurité)
            var voiture = await _context.Voitures.FindAsync(vente.IdVoiture);
            if (voiture == null)
                return BadRequest("Voiture introuvable");

            vente.Montant = voiture.Prix;

            _context.Ventes.Add(vente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = vente.IdVente }, vente);
        }

        // ================= PUT =================
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Vente vente)
        {
            if (id != vente.IdVente)
                return BadRequest("ID invalide");

            var existing = await _context.Ventes.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Date_Vente = vente.Date_Vente;
            existing.IdClient = vente.IdClient;
            existing.IdVoiture = vente.IdVoiture;

            // 🔥 recalcul montant
            var voiture = await _context.Voitures.FindAsync(vente.IdVoiture);
            if (voiture != null)
                existing.Montant = voiture.Prix;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vente = await _context.Ventes.FindAsync(id);

            if (vente == null)
                return NotFound("Vente non trouvée");

            _context.Ventes.Remove(vente);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vente supprimée avec succès" });
        }
    }
}