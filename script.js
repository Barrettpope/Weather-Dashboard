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
        var newSearch = $("<button type=button id=newSearch class=btn-sm>").text(userInput)
        $(".new-div").append(newSearch);
        city.text(userInput + " | ");
        cityName = userInput;
        if (userInput === newSearch) {

        }

        // Current Weather API
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log("This is for general weather ", response);
            var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
            console.log(temp)
            $('#temperature').text(temp + " degrees Farenheit");
            var humid = response.main.humidity;
            $("#humidity").text(humid + "%");
            var ws = response.wind.speed;
            $("#windSpeed").text(ws + " mph");
            var lat = response.coord.lat;
            var lon = response.coord.lon;
        })

        // 5-Day Forecast API
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            for (var i = 0; i < response.list.length; i += 8) {
                var date1 = response.list[i].dt_txt;
                var temp1 = Math.floor((response.list[i].main.temp - 273.15) * 1.80 + 32);
                var humid1 = response.list[i].main.humidity;

                $("#day1").text(date1);
                $("#tempDay1").text(temp1);
                $("#humidityDay1").text(humid1);
            }

            console.log("This is for 5 day forecasts ", response);
        })
    })

});

// TO DO's:
// Display current date at top
// Figure out why "&degF" is not working
// Display UV Index
// Display 5-day forecast (Possibly 5 for loops needed)
// Create conditional statement not diplaying duplicate user inputs
// Copy AJAX code for city button clicks