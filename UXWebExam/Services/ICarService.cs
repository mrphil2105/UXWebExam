using UXWebExam.Models;

namespace UXWebExam.Services;

public interface ICarService
{
    Task<List<CarModel>> GetAllAsync();

    IEnumerable<string> GetCarImages();

    Task<int> CreateAsync(CarModel carModel);
}
