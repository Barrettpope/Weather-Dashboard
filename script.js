$(document).ready(function () {

    var uvIndex = $("uvIndex");
    var firstDate = $("#day1");
    var secondDate = $("#day2");
    var thirdDate = $("#day3");
    var fourthDate = $("#day4");
    var fifthDate = $("#day5");

    // Click function on search button displays user input onto the current city div and data from AJAX request onto the corresponding divs
    $("#searchButton").on("click", function () {
        var city = $("#currentCity");
        var userInput = $("#userCity").val();
        var newSearch = $("<button type=button class=btn-sm>").text(userInput)
        $(".new-div").append(newSearch);
        city.text(userInput + " | ");
        cityName = userInput;
        if (userInput === newSearch) {
            display
        }

        // Current Weather API
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log("This is for general weather ", response);
            var temp = response.main.temp;
            console.log(temp)
            $('#temperature').append(temp + " degrees Farenheit");
            var humid = response.main.humidity;
            $("#humidity").append(humid + "%");
            var ws = response.wind.speed;
            $("#windSpeed").append(ws + " mph");
            var lat = response.coord.lat;
            var lon = response.coord.lon;
        })

        // 5-Day Forecast API
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {

            console.log("This is for 5 day forecasts ", response);
        })
    })



});

// TO DO's:
// Display current date at top
// Figure out why "&degF" is not working
// Display UV Index
// Display 5-day forecast (Possibly 5 for loops needed
// Create conditional statement not diplaying duplicate user inputs
// Copy AJAX code for city button clicks