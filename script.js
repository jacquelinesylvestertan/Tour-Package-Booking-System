function booking() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("bookingEmail").value;
    let phone = document.getElementById("phone").value;
    let traveldate = document.getElementById("traveldate").value;
    let participants = document.getElementById("participants").value;
    let tourpackage = document.getElementById("tourpackage").value;

    let error = "";

    if (fullname == "") {
        error = "Please enter your full name.";
    }
    else if (email == "" || !email.includes("@")) {
        error = "Please enter a valid email address.";
    }
    else if (phone == "") {
        error = "Please enter your phone number.";
    }
    else if (traveldate == "") {
        error = "Please select your travel date.";
    }
    else if (participants == "") {
        error = "Please enter the number of participants.";
    }
    else if (participants <= 0) {
        error = "Number of participants must be more than 0.";
    }
    else if (tourpackage == "") {
        error = "Please select a tour package.";
    }

    if (error != "") {
        alert(error);
        return false;
    }

    alert("Booking submitted successfully!");

    return false;
}


function names() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let consent = document.getElementById("consent").checked;

    let error = "";

    if (name == "") {
        error = "Please enter your name.";
    }
    else if (email == "" || !email.includes("@")) {
        error = "Please enter a valid email address.";
    }
    else if (message == "") {
        error = "Please write a message.";
    }
    else if (consent == false) {
        error = "Please agree to the privacy and responsible use of your information.";
    }

    if (error != "") {
        alert(error);
        return false;
    }

    alert("Submitted successfully, thank you!");

    return false;
}


$(document).on("pagecreate", "#tourpackagePage", function() {

    // Tooltip
    $(".tooltip").on("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        let packageItem = $(this).closest(".packages");

        let price = packageItem.data("price");
        let duration = packageItem.data("duration");

        $(".custom-tooltip").remove();

        let tooltip =
            '<div class="custom-tooltip">' +
            '<b>Price:</b> ' + price +
            '<br>' +
            '<b>Duration:</b> ' + duration +
            '</div>';

        $(this).after(tooltip);

        $(this).next(".custom-tooltip").fadeIn(200);

        setTimeout(function() {
            $(".custom-tooltip").fadeOut(200, function() {
                $(this).remove();
            });
        }, 3000);
    });


    // Tour Package Popup
    $(".packages").on("click", function(event) {

        // Don't open package popup when clicking ?
        if ($(event.target).hasClass("tooltip")) {
            return;
        }

        var target = $(this),

            name = target.find("h2").clone()
                .children()
                .remove()
                .end()
                .text()
                .trim(),

            price = target.data("price"),
            duration = target.data("duration"),
            activities = target.data("activities"),
            facilities = target.data("facilities"),
            short = target.attr("id");


        var closebtn =
            '<a href="#" data-rel="back" ' +
            'class="ui-btn ui-corner-all ui-btn-a ' +
            'ui-icon-delete ui-btn-icon-notext ui-btn-right">' +
            'Close</a>';


        var header =
            '<div data-role="header">' +
            '<h2>' + name + '</h2>' +
            '</div>';


        var content =
            '<div role="main" class="ui-content">' +

            '<p><b>Price:</b> ' +
            price +
            '</p>' +

            '<p><b>Duration:</b> ' +
            duration +
            '</p>' +

            '<p><b>Activities:</b><br>' +
            activities +
            '</p>' +

            '<p><b>Facilities:</b><br>' +
            facilities +
            '</p>' +

            '</div>';


        var popup =
            '<div data-role="popup" ' +
            'id="popup-' + short + '" ' +
            'data-short="' + short + '" ' +
            'data-theme="none" ' +
            'data-overlay-theme="a" ' +
            'data-corners="false" ' +
            'data-tolerance="15">' +
            '</div>';


        $(header)
            .appendTo(
                $(popup)
                    .appendTo($.mobile.activePage)
                    .popup()
            )
            .toolbar()
            .before(closebtn)
            .after(content);


        $("#popup-" + short).popup("open");

    });


    // Remove popup after closing
    $(document).on(
        "popupafterclose",
        ".ui-popup",
        function() {
            $(this).remove();
        }
    );

});


