using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// Its a good idea to restart API server when adding a controller so that the app can register it.

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // It is best practice to use async when querrying databases so that the thread on which the original request came in
        // can take on another task, while delegating retrieving the data to another thread

        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return await Mediator.Send(new GetActivityDetails.Query{Id = id});
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
    {
        return await Mediator.Send(new CreateActivity.Command{ActivityDTO = activityDto});
    }

    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command {Activity = activity});
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command {Id = id});
        return Ok();
    }
}