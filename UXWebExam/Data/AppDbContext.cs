using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace UXWebExam.Data;

public class AppDbContext : ApiAuthorizationDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options,
        IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }

    public DbSet<Car> Cars { get; set; } = null!;

    public DbSet<Booking> Bookings { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Car

        builder.Entity<Car>()
            .Property(c => c.Name)
            .HasMaxLength(100);

        builder.Entity<Car>()
            .Property(c => c.Street)
            .HasMaxLength(100);

        builder.Entity<Car>()
            .Property(c => c.HouseNumber)
            .HasMaxLength(100);

        builder.Entity<Car>()
            .Property(c => c.City)
            .HasMaxLength(100);
    }
}
