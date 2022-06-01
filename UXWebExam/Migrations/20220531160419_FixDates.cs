using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UXWebExam.Migrations
{
    public partial class FixDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "RentDate",
                table: "Cars",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "RentEnd",
                table: "Cars",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RentDate",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "RentEnd",
                table: "Cars");
        }
    }
}
