using Microsoft.AspNetCore.Mvc;
using GestionVoitureAPI.Data;
using GestionVoitureAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionVoitureAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientsController(AppDbContext context)
        {
            _context = context;
        }

        // ================= GET ALL =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        // ================= POST =================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Client c)
        {
            if (c == null)
                return BadRequest();

            _context.Clients.Add(c);
            await _context.SaveChangesAsync();

            return Ok(c);
        }

        // ================= PUT =================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Client c)
        {
            var data = await _context.Clients.FindAsync(id);

            if (data == null)
                return NotFound();

            data.Nom = c.Nom;
            data.Prenom = c.Prenom;
            data.Telephone = c.Telephone;
            data.Email = c.Email;

            await _context.SaveChangesAsync();

            return Ok(data);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var c = await _context.Clients.FindAsync(id);

            if (c == null)
                return NotFound();

            _context.Clients.Remove(c);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}