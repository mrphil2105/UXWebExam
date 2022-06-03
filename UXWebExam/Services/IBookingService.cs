using UXWebExam.Models;

namespace UXWebExam.Services;

public interface IBookingService
{
    Task<BookingResult> BookCarAsync(BookModel bookModel);

    Task<BookingModel?> GetBookingAsync(int id);

    Task<List<BookingModel>> GetBookingsAsync();
}
