using UXWebExam.Data;
using UXWebExam.Models;

namespace UXWebExam.Services;

public static class CarExtensions
{
    public static CarModel ToModel(this Car car)
    {
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
}
