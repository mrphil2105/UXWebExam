using UXWebExam.Models;

namespace UXWebExam.Services;

public interface ICarService
{
    Task<CarModel?> GetCarAsync(int id);

    Task<List<CarModel>> GetAllAsync();

    IEnumerable<string> GetCarImages();

    Task<int> CreateAsync(CarModel carModel);
}
