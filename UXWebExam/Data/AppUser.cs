using Microsoft.AspNetCore.Identity;

namespace UXWebExam.Data;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    // Navigation properties

    public ICollection<Car> Cars { get; set; } = null!;
}
