using UXWebExam.Data;
using UXWebExam.Models;
using UXWebExam.Services;

namespace UXWebExam.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CarController : Controller
{
    private readonly ICarService _carService;

    public CarController(ICarService carService)
    {
        _carService = carService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cars = await _carService.GetAllAsync();

        return Json(cars);
    }

    [HttpGet]
    public IActionResult GetCarTypes()
    {
        string[] carTypes = Enum.GetNames<CarType>();

        return Json(carTypes);
    }

    [HttpGet]
    public IActionResult GetCarImages()
    {
        var carImages = _carService.GetCarImages();

        return Json(carImages);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCar([FromBody] CarModel carModel)
    {
        int id = await _carService.CreateAsync(carModel);

        return CreatedAtAction(nameof(CreateCar), new { id }, carModel);
    }
}
