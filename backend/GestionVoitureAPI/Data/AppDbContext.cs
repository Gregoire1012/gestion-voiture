using Microsoft.EntityFrameworkCore;
using GestionVoitureAPI.Models;

namespace GestionVoitureAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ================= TABLES =================
        public DbSet<Client> Clients { get; set; }
        public DbSet<Voiture> Voitures { get; set; }
        public DbSet<Vente> Ventes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ================= SCHEMA (IMPORTANT PRO) =================
            modelBuilder.HasDefaultSchema("public");

            // ================= TABLE NAMES =================
            modelBuilder.Entity<Client>().ToTable("Clients");
            modelBuilder.Entity<Voiture>().ToTable("Voitures");
            modelBuilder.Entity<Vente>().ToTable("Ventes");

            // ================= PRIMARY KEYS =================
            modelBuilder.Entity<Client>()
                .HasKey(c => c.IdClient);

            modelBuilder.Entity<Voiture>()
                .HasKey(v => v.IdVoiture);

            modelBuilder.Entity<Vente>()
                .HasKey(v => v.IdVente);

            // ================= RELATION CLIENT -> VENTES =================
            modelBuilder.Entity<Vente>()
                .HasOne(v => v.Client)
                .WithMany(c => c.Ventes) // ✔ mieux (relation propre)
                .HasForeignKey(v => v.IdClient)
                .OnDelete(DeleteBehavior.Cascade);

            // ================= RELATION VOITURE -> VENTES =================
            modelBuilder.Entity<Vente>()
                .HasOne(v => v.Voiture)
                .WithMany(v => v.Ventes) // ✔ mieux aussi
                .HasForeignKey(v => v.IdVoiture)
                .OnDelete(DeleteBehavior.Cascade);

            // ================= PRECISION MONTANT =================
            modelBuilder.Entity<Vente>()
                .Property(v => v.Montant)
                .HasPrecision(18, 2);
        }
    }
}