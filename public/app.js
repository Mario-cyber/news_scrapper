// this mehtod gets the nesws from the databse and addtional funtionality displays the proper information in HTML
$.getJSON("/news", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#comments").empty();
    console.log("hello World")
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/News/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#comments").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#comments").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.comment) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.comment.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.comment.body);
            }
        });
});