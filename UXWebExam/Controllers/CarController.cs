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
    public async Task<IActionResult> GetCar(int id)
    {
        var car = await _carService.GetCarAsync(id);

        return Json(car);
    }

    [HttpGet]
    public async Task<IActionResult> GetCars()
    {
        var cars = await _carService.GetCarsAsync();

        return Json(cars);
    }

    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] SearchModel searchModel)
    {
        var result = await _carService.SearchAsync(searchModel);

        if (!result.Succeeded)
        {
            string? message = null;

            if (result.InvalidDates)
            {
                message = "The selected start date exceeds the end date.";
            }

            return Problem(detail: message, statusCode: 400);
        }

        return Json(result.Cars);
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

        return Json(id);
    }
}
