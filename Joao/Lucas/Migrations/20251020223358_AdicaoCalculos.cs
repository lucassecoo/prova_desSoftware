using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lucas.Migrations
{
    /// <inheritdoc />
    public partial class AdicaoCalculos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AdicionalBandeira",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ConsumoFaturado",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Tarifa",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TaxaEsgoto",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ValorAgua",
                table: "ConsumosDeAgua",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdicionalBandeira",
                table: "ConsumosDeAgua");

            migrationBuilder.DropColumn(
                name: "ConsumoFaturado",
                table: "ConsumosDeAgua");

            migrationBuilder.DropColumn(
                name: "Tarifa",
                table: "ConsumosDeAgua");

            migrationBuilder.DropColumn(
                name: "TaxaEsgoto",
                table: "ConsumosDeAgua");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "ConsumosDeAgua");

            migrationBuilder.DropColumn(
                name: "ValorAgua",
                table: "ConsumosDeAgua");
        }
    }
}
