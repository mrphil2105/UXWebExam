using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using UXWebExam.Models;
using UXWebExam.Services;

namespace UXWebExam.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class BookController : Controller
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpPost]
    public async Task<IActionResult> BookCar([FromBody] BookModel bookModel)
    {
        var result = await _bookService.BookCarAsync(bookModel);

        if (result != BookResult.Success)
        {
            string message = result switch
            {
                BookResult.NoCar => "The car has been deleted since you visited this page.",
                BookResult.AlreadyBooked => "The car has already been booked in the selected time period.",
                _ => throw new SwitchExpressionException($"Missing switch expression case for value '{result}'.")
            };

            return Problem(detail: message, statusCode: 400);
        }

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        var bookings = await _bookService.GetBookingsAsync();

        return Json(bookings);
    }
}
