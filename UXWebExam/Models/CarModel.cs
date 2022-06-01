using System.ComponentModel.DataAnnotations;

namespace UXWebExam.Models;

public class CarModel
{
    public int Id { get; init; }

    [Required]
    public string? Name { get; init; }

    public string? Description { get; init; }

    [Required]
    public string? Type { get; init; }

    [Required]
    public decimal Price { get; init; }

    public string? ImageUrl { get; init; }

    public string? Street { get; init; }

    public string? HouseNumber { get; init; }

    public int PostalCode { get; init; }

    public string? City { get; init; }

    [Required]
    public double Longitude { get; init; }

    [Required]
    public double Latitude { get; init; }
}
