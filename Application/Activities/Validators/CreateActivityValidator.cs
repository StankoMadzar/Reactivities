using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;
namespace Application.Activities.Validators;

public class CreateActivityValidator 
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDTO> // This basically validates the CreateActivityDTO
{
    public CreateActivityValidator() : base(x => x.ActivityDTO)
    {

    }
}
