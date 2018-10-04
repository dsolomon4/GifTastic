
// 2. **[Watch the demo video](https://youtu.be/BqreERTLjgQ)**

//    * You should have a high-level understanding of how this assignment works before attempting to code it.



// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.


// variable for button holder
var heroButtons = ["Thor", "Wolverine", "Batman"];

var newHeroBtn = "";

// functino to create buttons from button array
function makeButtons() {
    $("#button-view").empty()
    for (var i = 0; i < heroButtons.length; i++) {
        var newHeroBtn = $('<button>');
        newHeroBtn.addClass("hero-button btn btn-secondary btn-lg");
        newHeroBtn.attr("hero-value", heroButtons[i]);
        newHeroBtn.text(heroButtons[i]);
        $("#button-view").append(newHeroBtn);
        console.log(newHeroBtn)

        var heroData = newHeroBtn.attr("hero-value");
        console.log(heroData)

    }
}

// This function handles events where one button is clicked
$("#find-hero").on("click", function (event) {
    event.preventDefault()

    $("#superhero-input").val();
    var newHero = $("#superhero-input").val().toLowerCase().trim();
    heroButtons.push(newHero)

    makeButtons()
});

//This function recieves the data from the value
function retreiveInfo() {
    var heroData = $(this).attr("hero-value");
    // connect gif site to ajax
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroData + "&api_key=LAZZ4Kv6bUYgx6pN49WB4jrKUe3L4mZZ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // $("#gif-view").text(JSON.stringify(response));

        for (var i = 0; i < response.data.length; i++) {

            //Rating
            var rating = response.data[i].rating;
            var ratingDisplay = $("<p>").text("Rating: " + rating);

            // Image
            var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            gifImage.addClass("gif");
            gifImage.addClass("play");
            gifImage.attr("data-state", "still");
            gifImage.attr("data-name", heroData);
            gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", response.data[i].images.fixed_height.url)

            //connect response to html
            $("#gif-view").append(ratingDisplay);
            $(ratingDisplay).append(gifImage);

            
        }
    })

}


function playingGif(){
    var state = $(this).attr("data-state")
     if (state === "still"){
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else{
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }

}


// // //create button on click
// $("#find-hero").on("click", function (event) {
//     //Cancel the default action (navigation) of the click.
//     event.preventDefault();

//     // defining input variable
//     var hero = $("#superhero-input").val().toLowerCase().trim();

//     // connect gif site to ajax
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=LAZZ4Kv6bUYgx6pN49WB4jrKUe3L4mZZ&limit=10";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         console.log(response.data);
        
//         for (var i = 0; i < response.data.length; i++) {
//         
//     }
//     })
// });

$(document).on("click", ".hero-button", retreiveInfo);

$(document).on("click", ".play", playingGif);

makeButtons()
