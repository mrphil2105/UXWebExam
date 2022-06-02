using System.ComponentModel.DataAnnotations;

namespace UXWebExam.Models;

public class BookModel
{
    public int CarId { get; init; }

    [Required]
    public string? StartDate { get; init; }

    [Required]
    public string? EndDate { get; init; }
}
