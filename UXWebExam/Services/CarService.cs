using System.Globalization;
using Microsoft.EntityFrameworkCore;
using UXWebExam.Data;
using UXWebExam.Models;

namespace UXWebExam.Services;

public class CarService : ICarService
{
    private const string ImagesPath = "/images/cars/";

    private readonly AppDbContext _dbContext;

    public CarService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CarModel?> GetCarAsync(int id)
    {
        var car = await _dbContext.Cars.FirstOrDefaultAsync(c => c.Id == id);

        return car?.ToModel();
    }

    public async Task<List<CarModel>> GetAllAsync()
    {
        var cars = await _dbContext.Cars.ToListAsync();

        return cars.Select(c => c.ToModel())
            .ToList();
    }

    public async Task<SearchResult> SearchAsync(SearchModel searchModel)
    {
        IEnumerable<Car> cars = await _dbContext.Cars.Include(c => c.Bookings)
            .ToListAsync();

        DateTimeOffset.TryParseExact(searchModel.FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture,
            DateTimeStyles.None, out var fromDate);
        DateTimeOffset.TryParseExact(searchModel.ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture,
            DateTimeStyles.None, out var toDate);

        if (fromDate != default && toDate != default && fromDate > toDate)
        {
            return new SearchResult { InvalidDates = true };
        }

        if (!string.IsNullOrWhiteSpace(searchModel.Term))
        {
            cars = cars.Where(c =>
                c.Name.Contains(searchModel.Term, StringComparison.InvariantCultureIgnoreCase) ||
                c.Description.Contains(searchModel.Term, StringComparison.InvariantCultureIgnoreCase));
        }

        if (Enum.TryParse<CarType>(searchModel.Type, out var type))
        {
            cars = cars.Where(c => c.Type == type);
        }

        if (fromDate != default && toDate != default)
        {
            cars = cars.Where(c => !c.Bookings.Any(b =>
                (fromDate >= b.StartDate && fromDate <= b.EndDate) || (toDate <= b.EndDate && toDate >= b.StartDate)));
        }

        return new SearchResult
        {
            Succeeded = true,
            Cars = cars.Select(c => c.ToModel())
                .ToList()
        };
    }

    public List<string> GetCarImages()
    {
        string directoryPath = Path.Combine(("ClientApp/public" + ImagesPath).Split('/'));

        return Directory.EnumerateFiles(directoryPath)
            .Select(Path.GetFileName)
            .ToList()!;
    }

    public async Task<int> CreateAsync(CarModel carModel)
    {
        string imageUrl = carModel.ImageUrl!;

        if (!string.IsNullOrWhiteSpace(imageUrl) && !imageUrl.StartsWith(ImagesPath))
        {
            imageUrl = ImagesPath + imageUrl;
        }

        var car = new Car
        {
            Name = carModel.Name!,
            Description = carModel.Description!,
            Type = Enum.Parse<CarType>(carModel.Type!),
            Price = carModel.Price,
            ImageUrl = imageUrl,
            Street = carModel.Street!,
            HouseNumber = carModel.HouseNumber!,
            PostalCode = carModel.PostalCode,
            City = carModel.City!,
            Longitude = carModel.Longitude,
            Latitude = carModel.Latitude
        };

        _dbContext.Cars.Add(car);
        await _dbContext.SaveChangesAsync();

        return car.Id;
    }
}
