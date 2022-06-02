namespace UXWebExam.Data;

public class Booking
{
    public int Id { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset EndDate { get; set; }

    // Navigation properties

    public string UserId { get; set; } = null!;

    public AppUser User { get; set; } = null!;

    public int CarId { get; set; }

    public Car Car { get; set; } = null!;
}
