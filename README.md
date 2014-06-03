ASP-MVC-Tooltip-Validation
==========================

MVC Tooltip Validation is a jQuery plugin that will convert Validation Messages in MVC App to a Bootstrap tooltip.
Its simple, very simple .. just check Register View in this sample application

    <div class="form-group">
        @Html.LabelFor(m => m.UserName, new { @class = "col-md-2 control-label" })
        <div class="col-md-10">
            @Html.TextBoxFor(m => m.UserName, new { @class = "form-control" })
            @Html.ValidationMessageFor(m => m.UserName)
        </div>
    </div>
    
And in document ready add

    $("#UserName").tooltipValidation();
    
Or

    $("form input").tooltipValidation({
        placement: "right"
    });
