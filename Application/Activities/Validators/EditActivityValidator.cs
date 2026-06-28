using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Validators;
using FluentValidation;

namespace Application.Activities.Vaidators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDTO>
{
    public EditActivityValidator() : base(x => x.ActivityDTO)
    {
        RuleFor(x => x.ActivityDTO.Id)
            .NotEmpty().WithMessage("Id is required");
    }
}