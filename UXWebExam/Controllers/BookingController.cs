using Microsoft.AspNetCore.Authorization;
using UXWebExam.Models;
using UXWebExam.Services;

namespace UXWebExam.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class BookingController : Controller
{
    private readonly IBookingService _bookService;

    public BookingController(IBookingService bookService)
    {
        _bookService = bookService;
    }

    [HttpPost]
    public async Task<IActionResult> BookCar([FromBody] BookModel bookModel)
    {
        var result = await _bookService.BookCarAsync(bookModel);

        if (!result.Succeeded)
        {
            string? message = null;

            if (result.InvalidDates)
            {
                message = "The selected start date exceeds the end date.";
            }
            else if (result.HasNoCar)
            {
                message = "The car has been deleted since you visited this page.";
            }
            else if (result.AlreadyBooked)
            {
                message = "The car has already been booked in the selected time period.";
            }

            return Problem(detail: message, statusCode: 400);
        }

        return Json(result.BookingId);
    }

    [HttpGet]
    public async Task<IActionResult> GetBooking(int id)
    {
        var booking = await _bookService.GetBookingAsync(id);

        return Json(booking);
    }

    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        var bookings = await _bookService.GetBookingsAsync();

        return Json(bookings);
    }
}
