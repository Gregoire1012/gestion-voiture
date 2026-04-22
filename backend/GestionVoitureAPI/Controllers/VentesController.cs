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

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vente>>> Get()
        {
            return await _context.Ventes.ToListAsync();
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<Vente>> Post(Vente vente)
        {
            _context.Ventes.Add(vente);
            await _context.SaveChangesAsync();
            return Ok(vente);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var v = await _context.Ventes.FindAsync(id);
            if (v == null) return NotFound();

            _context.Ventes.Remove(v);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}