namespace UXWebExam.Models;

public class BookingModel
{
    public int Id { get; init; }

    public string? StartDate { get; init; }

    public string? EndDate { get; init; }

    public CarModel? Car { get; init; }
}
