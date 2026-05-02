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
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Voiture> Voitures => Set<Voiture>();
        public DbSet<Vente> Ventes => Set<Vente>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ================= TABLE NAMES =================
            modelBuilder.Entity<Client>().ToTable("client");
            modelBuilder.Entity<Voiture>().ToTable("voiture");
            modelBuilder.Entity<Vente>().ToTable("vente");

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
                .WithMany(c => c.Ventes)
                .HasForeignKey(v => v.IdClient)
                .OnDelete(DeleteBehavior.Cascade);

            // ================= RELATION VOITURE -> VENTES =================
            modelBuilder.Entity<Vente>()
                .HasOne(v => v.Voiture)
                .WithMany(vt => vt.Ventes)
                .HasForeignKey(v => v.IdVoiture)
                .OnDelete(DeleteBehavior.Cascade);

            // ================= PRECISION MONTANT =================
            modelBuilder.Entity<Vente>()
                .Property(v => v.Montant)
                .HasPrecision(18, 2);

            // ================= OPTION MYSQL CLEAN =================
modelBuilder.Entity<Client>().ToTable("client");
modelBuilder.Entity<Voiture>().ToTable("voiture");
modelBuilder.Entity<Vente>().ToTable("vente");
        }
    }
}