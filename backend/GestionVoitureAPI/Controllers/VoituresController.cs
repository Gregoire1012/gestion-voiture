using Microsoft.AspNetCore.Mvc;
using GestionVoitureAPI.Data;
using GestionVoitureAPI.Models;

namespace GestionVoitureAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoituresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VoituresController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Voitures.ToList());
        }

        // POST (INSERT)
        [HttpPost]
        public IActionResult Create([FromBody] Voiture v)
        {
            _context.Voitures.Add(v);
            _context.SaveChanges();
            return Ok(v);
        }

        // PUT
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Voiture v)
        {
            var data = _context.Voitures.Find(id);
            if (data == null) return NotFound();

            data.Matricule = v.Matricule;
            data.Marque = v.Marque;
            data.Couleur = v.Couleur;
            data.Type = v.Type;
            data.Prix = v.Prix;
            data.Image = v.Image;

            _context.SaveChanges();
            return Ok(data);
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var v = _context.Voitures.Find(id);
            if (v == null) return NotFound();

            _context.Voitures.Remove(v);
            _context.SaveChanges();
            return Ok();
        }
    }
}