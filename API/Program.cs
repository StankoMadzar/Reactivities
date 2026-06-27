using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;


/* App Builder
This initializes a builder object that handles default configurations like loading appsettings.json,
setting up environment variables and configuring default logging
*/

var builder = WebApplication.CreateBuilder(args);

/* Registering Services (Dependency injection)
Before building the app we must tell .NET about the tools (services) it will need
AddControlers() 
>> Tells the app that we are building a Web API and it needs to support API controllers (endpoints that handle http requests)
AddDbContext() 
>> Registers my Entity Framework Core database context. It instructs the app to use SQLite as default database engine and looks
inside appsettings.json for a connection string named "Default connection" to know where the database file lives.
*/

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>( opt=>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// cross origin resource sharing (safety feature) that restricts web pages from making requests to a different domain than the one that served the original web page
builder.Services.AddCors(); 
builder.Services.AddMediatR(x =>
{
        x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
        x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>(); // transient meaning that it will only be insantiated when needed

/* Reflection >> "Go find the compiled project (Assembly) where GetActivityList.Handler lives. 
Once you are inside that project, scan every single class in the entire file structure. 
If you find any class that implements IRequestHandler, register it automatically!"*/

/* Building the application
This finalizes the configuration and officially creates the app instance. Once this is called, you can no longer register new services;
*/

var app = builder.Build();

/* Configure the HTTP request pipeline.
This configures the middleware pipeline
MapControllers tells .NET to look at your controller classes and route incomming HTTP request to the correct code
*/
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.MapControllers();

/*
Database Migration and Seeding
This runs after the app is build but before it starts accepting internal traffic
Because the app isn't handling a normal HTTP request yet, we have to manually create a temporary scope
*/

using var scope = app.Services.CreateScope(); // using keyword is there to ensure that we dispose of the scope as soon as setup is finished
var services = scope.ServiceProvider;

/*
GetRequiredService<AppDbContext>(): 
Asks the system for an instance of your database context.

await context.Database.MigrateAsync(): 
Every time the app starts up, it checks your database. If you have created new Entity Framework migrations, it will automatically apply them. 
You don't have to manually update the database via the terminal in production.

await DbInitializer.SeedData(context):
Once the database structure is up to date, this populates the database with initial fake or default data
*/

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error Occured during migration.");
    // here we catch an error if something occurs in the process and log it.
}

// This boots up the web server and puts the application in a listening state.
app.Run();