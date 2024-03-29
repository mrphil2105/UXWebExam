using UXWebExam.Models;

namespace UXWebExam.Services;

public interface ICarService
{
    Task<CarModel?> GetCarAsync(int id);

    Task<List<CarModel>> GetCarsAsync();

    Task<SearchResult> SearchAsync(SearchModel searchModel);

    List<string> GetCarImages();

    Task<int> CreateAsync(CarModel carModel);
}
