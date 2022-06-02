namespace UXWebExam.Services;

public class BookingResult
{
    public int BookingId { get; init; }

    public bool Succeeded { get; init; }

    public bool InvalidDates { get; init; }

    public bool HasNoCar { get; init; }

    public bool AlreadyBooked { get; init; }
}
