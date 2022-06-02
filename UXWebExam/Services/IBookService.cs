using UXWebExam.Models;

namespace UXWebExam.Services;

public interface IBookService
{
    Task<BookResult> BookCarAsync(BookModel bookModel);

    Task<List<BookingModel>> GetBookingsAsync();
}
