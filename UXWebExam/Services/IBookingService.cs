using UXWebExam.Models;

namespace UXWebExam.Services;

public interface IBookingService
{
    Task<BookingResult> BookCarAsync(BookModel bookModel);

    Task<List<BookingModel>> GetBookingsAsync();
}
