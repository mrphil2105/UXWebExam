using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using UXWebExam.Data;
using UXWebExam.Services;

namespace UXWebExam;

public class Startup
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _environment = environment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(o => o.UseSqlite(connectionString));
        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddDefaultIdentity<AppUser>(o =>
            {
                o.Password.RequiredLength = 8;
                o.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<AppDbContext>();

        services.AddIdentityServer(o => o.IssuerUri = "https://localhost:44429")
            .AddApiAuthorization<AppUser, AppDbContext>();

        services.AddAuthentication()
            .AddIdentityServerJwt();

        services.ConfigureApplicationCookie(o => o.LoginPath = "/Identity/Account/Login");

        services.AddScoped<ICarService, CarService>();
        services.AddScoped<IBookingService, BookingService>();

        var controllersBuilder = services.AddControllersWithViews();
        var razorPagesBuilder = services.AddRazorPages();

        if (_environment.IsDevelopment())
        {
            controllersBuilder.AddRazorRuntimeCompilation();
            razorPagesBuilder.AddRazorRuntimeCompilation();
        }
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseMigrationsEndPoint();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseAuthentication();
        app.UseIdentityServer();
        app.UseAuthorization();

        app.UseEndpoints(b =>
        {
            b.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            b.MapRazorPages();
            b.MapFallbackToFile("index.html");
        });

        using var scope = app.ApplicationServices.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate();
    }
}
