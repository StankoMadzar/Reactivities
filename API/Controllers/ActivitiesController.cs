using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers;

// Its a good idea to restart API server when adding a controller so that the app can register it.

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // It is best practice to use async when querrying databases so that the thread on which the original request came in
        // can take on another task, while delegating retrieving the data to another thread

        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id);

        if(activity == null) return NotFound();

        return activity;
    }
}