using System;
using Application.Activities.Commands;
using FluentValidation;
namespace Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command> // This basically validates the CreateActivityDTO
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDTO.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.ActivityDTO.Description).NotEmpty().WithMessage("Description is required");
    }
}
