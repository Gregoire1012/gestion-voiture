using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionVoitureAPI.Data;
using GestionVoitureAPI.Models;

namespace GestionVoitureAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoituresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VoituresController(AppDbContext context)
        {
            _context = context;
        }

        // ================= GET ALL (✔ FIX 405 ERROR) =================
        [HttpGet]
        public async Task<IActionResult> GetVoitures()
        {
            var data = await _context.Voitures.ToListAsync();
            return Ok(data);
        }

        // ================= GET IMAGE =================
        [HttpGet("image/{name}")]
        public IActionResult GetImage(string name)
        {
            var path = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/images",
                name
            );

            if (!System.IO.File.Exists(path))
                return NotFound();

            var bytes = System.IO.File.ReadAllBytes(path);

            var contentType = "image/jpeg";
            if (name.EndsWith(".png")) contentType = "image/png";
            if (name.EndsWith(".jpg") || name.EndsWith(".jpeg")) contentType = "image/jpeg";

            return File(bytes, contentType);
        }

        // ================= POST (AJOUT) =================
        [HttpPost]
        public async Task<IActionResult> PostVoiture([FromForm] Voiture voiture, [FromForm] IFormFile? image)
        {
            if (image != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);

                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fullPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                voiture.Image = fileName;
            }

            _context.Voitures.Add(voiture);
            await _context.SaveChangesAsync();

            return Ok(voiture);
        }

        // ================= PUT (MODIF) =================
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoiture(int id, [FromForm] Voiture voiture, [FromForm] IFormFile? image)
        {
            var existing = await _context.Voitures.FindAsync(id);

            if (existing == null)
                return NotFound();

            existing.Matricule = voiture.Matricule;
            existing.Marque = voiture.Marque;
            existing.Couleur = voiture.Couleur;
            existing.Type = voiture.Type;
            existing.Prix = voiture.Prix;

            if (image != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fullPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                existing.Image = fileName;
            }

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoiture(int id)
        {
            var voiture = await _context.Voitures.FindAsync(id);

            if (voiture == null)
                return NotFound();

            _context.Voitures.Remove(voiture);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}