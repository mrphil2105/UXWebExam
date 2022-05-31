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

    public async Task<List<CarModel>> GetAllAsync()
    {
        var cars = await _dbContext.Cars.Include(c => c.User)
            .ToListAsync();

        return cars.Where(c => !c.RentEnd.HasValue || c.RentEnd > DateTimeOffset.Now)
            .Select(c => new CarModel
            {
                Id = c.Id,
                Name = c.Name,
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

        if (!imageUrl.StartsWith(ImagesPath))
        {
            imageUrl = ImagesPath + imageUrl;
        }

        var car = new Car
        {
            Name = carModel.Name!,
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
