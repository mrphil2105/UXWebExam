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
        var car = await _dbContext.Cars.Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (car == null)
        {
            return null;
        }

        return new CarModel
        {
            Id = car.Id,
            Name = car.Name,
            Description = car.Description,
            Type = car.Type.ToString(),
            Price = car.Price,
            ImageUrl = car.ImageUrl,
            Street = car.Street,
            HouseNumber = car.HouseNumber,
            PostalCode = car.PostalCode,
            City = car.City,
            Longitude = car.Longitude,
            Latitude = car.Latitude
        };
    }

    public async Task<List<CarModel>> GetAllAsync()
    {
        var cars = await _dbContext.Cars.Include(c => c.User)
            .ToListAsync();

        return cars.Where(c => !c.RentEnd.HasValue || c.RentEnd > DateTimeOffset.Now)
            .Select(c => new CarModel
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                Type = c.Type.ToString(),
                Price = c.Price,
                ImageUrl = c.ImageUrl,
                Street = c.Street,
                HouseNumber = c.HouseNumber,
                PostalCode = c.PostalCode,
                City = c.City,
                Longitude = c.Longitude,
                Latitude = c.Latitude
            })
            .ToList();
    }

    public IEnumerable<string> GetCarImages()
    {
        string directoryPath = Path.Combine(("ClientApp/public" + ImagesPath).Split('/'));

        return Directory.EnumerateFiles(directoryPath)
            .Select(Path.GetFileName)!;
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
