using UXWebExam.Models;

namespace UXWebExam.Services;

public class SearchResult
{
    public List<CarModel>? Cars { get; init; }

    public bool Succeeded { get; init; }

    public bool InvalidDates { get; init; }
}
