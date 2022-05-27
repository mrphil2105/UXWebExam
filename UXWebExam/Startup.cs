using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using UXWebExam.Data;

namespace UXWebExam;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
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

        services.AddIdentityServer()
            .AddApiAuthorization<AppUser, AppDbContext>();

        services.AddAuthentication()
            .AddIdentityServerJwt();

        services.ConfigureApplicationCookie(o => o.LoginPath = "/Identity/Account/Login");

        services.AddControllersWithViews();
        services.AddRazorPages();
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
    }
}
