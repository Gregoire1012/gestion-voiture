using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GestionVoitureAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "Clients",
                schema: "public",
                columns: table => new
                {
                    IdClient = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(type: "text", nullable: false),
                    Prenom = table.Column<string>(type: "text", nullable: false),
                    Telephone = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.IdClient);
                });

            migrationBuilder.CreateTable(
                name: "Voitures",
                schema: "public",
                columns: table => new
                {
                    IdVoiture = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Matricule = table.Column<string>(type: "text", nullable: false),
                    Marque = table.Column<string>(type: "text", nullable: false),
                    Couleur = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Prix = table.Column<decimal>(type: "numeric", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voitures", x => x.IdVoiture);
                });

            migrationBuilder.CreateTable(
                name: "Ventes",
                schema: "public",
                columns: table => new
                {
                    IdVente = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date_Vente = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Montant = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    IdClient = table.Column<int>(type: "integer", nullable: false),
                    IdVoiture = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ventes", x => x.IdVente);
                    table.ForeignKey(
                        name: "FK_Ventes_Clients_IdClient",
                        column: x => x.IdClient,
                        principalSchema: "public",
                        principalTable: "Clients",
                        principalColumn: "IdClient",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ventes_Voitures_IdVoiture",
                        column: x => x.IdVoiture,
                        principalSchema: "public",
                        principalTable: "Voitures",
                        principalColumn: "IdVoiture",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ventes_IdClient",
                schema: "public",
                table: "Ventes",
                column: "IdClient");

            migrationBuilder.CreateIndex(
                name: "IX_Ventes_IdVoiture",
                schema: "public",
                table: "Ventes",
                column: "IdVoiture");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ventes",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Clients",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Voitures",
                schema: "public");
        }
    }
}
