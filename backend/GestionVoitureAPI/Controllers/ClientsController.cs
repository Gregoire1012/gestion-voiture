using Microsoft.AspNetCore.Mvc;
using GestionVoitureAPI.Data;
using GestionVoitureAPI.Models;

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

        // GET
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Clients.ToList());
        }

        // POST
[HttpPost]
public IActionResult Create(Client c)
{
    _context.Clients.Add(c);
    _context.SaveChanges();

    return Ok(c);
}

        // PUT
        [HttpPut("{id}")]
        public IActionResult Update(int id, Client c)
        {
            var data = _context.Clients.Find(id);
            if (data == null) return NotFound();

            data.Nom = c.Nom;
            data.Prenom = c.Prenom;
            data.Telephone = c.Telephone;
            data.Email = c.Email;

            _context.SaveChanges();
            return Ok(data);
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var c = _context.Clients.Find(id);
            if (c == null) return NotFound();

            _context.Clients.Remove(c);
            _context.SaveChanges();
            return Ok();
        }
    }
}