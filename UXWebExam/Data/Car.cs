namespace UXWebExam.Data;

public class Car
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public CarType Type { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }

    public string Street { get; set; } = null!;

    public string HouseNumber { get; set; } = null!;

    public int PostalCode { get; set; }

    public string City { get; set; } = null!;

    public double Longitude { get; set; }

    public double Latitude { get; set; }

    public DateTimeOffset? RentDate;

    public DateTimeOffset? RentEnd;

    // Navigation properties

    public AppUser User { get; set; } = null!;
}
