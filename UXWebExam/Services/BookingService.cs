using System.Globalization;
using System.Security.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using UXWebExam.Data;
using UXWebExam.Models;

namespace UXWebExam.Services;

public class BookingService : IBookingService
{
    private readonly AppDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public BookingService(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<BookingResult> BookCarAsync(BookModel bookModel)
    {
        var car = await _dbContext.Cars.FindAsync(bookModel.CarId);

        if (car == null)
        {
            return new BookingResult { HasNoCar = true };
        }

        var existingBookings = await _dbContext.Bookings.Where(b => b.CarId == bookModel.CarId)
            .ToListAsync();

        var startDate = DateTimeOffset.ParseExact(bookModel.StartDate!, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        var endDate = DateTimeOffset.ParseExact(bookModel.EndDate!, "dd/MM/yyyy", CultureInfo.InvariantCulture);

        if (existingBookings.Any(b =>
                (startDate >= b.StartDate && startDate <= b.EndDate) ||
                (endDate <= b.EndDate && endDate >= b.StartDate)))
        {
            return new BookingResult { AlreadyBooked = true };
        }

        string? userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)
            ?.Value;

        if (userId == null)
        {
            throw new AuthenticationException("The user id for the currently logged in user could not be fetched.");
        }

        var booking = new Booking
        {
            StartDate = startDate, EndDate = endDate, CarId = bookModel.CarId, UserId = userId
        };
        _dbContext.Bookings.Add(booking);
        await _dbContext.SaveChangesAsync();

        return new BookingResult { BookingId = booking.Id, Succeeded = true };
    }

    public async Task<List<BookingModel>> GetBookingsAsync()
    {
        string? userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)
            ?.Value;

        if (userId == null)
        {
            throw new AuthenticationException("The user id for the currently logged in user could not be fetched.");
        }

        var bookings = await _dbContext.Bookings.Include(b => b.Car)
            .Where(b => b.UserId == userId)
            .ToListAsync();

        return bookings.Select(b => new BookingModel
            {
                Id = b.Id,
                StartDate = b.StartDate.ToString("dd/MM/yyyy"),
                EndDate = b.EndDate.ToString("dd/MM/yyyy"),
                Car = b.Car.ToModel()
            })
            .ToList();
    }
}
