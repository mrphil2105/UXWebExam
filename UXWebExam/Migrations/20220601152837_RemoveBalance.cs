using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UXWebExam.Migrations
{
    public partial class RemoveBalance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
