using Microsoft.AspNetCore.Mvc;
using GestionVoitureAPI.Data;

namespace GestionVoitureAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetStats()
        {
            var voitures = _context.Voitures.Count();
            var clients = _context.Clients.Count();
            var ventes = _context.Ventes.Count();
            var total = _context.Ventes.Sum(v => v.Montant);

            return Ok(new
            {
                voitures,
                clients,
                ventes,
                total
            });
        }
    }
}