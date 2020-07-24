$(document).ready(function () {

    // Empty array of saved cities, derived from user input
    var savedCities = [];

    // Click function on search button displays user input onto the current city div and data from AJAX request onto the corresponding divs
    $("#searchButton").on("click", function () {
        var city = $("#currentCity");
        var userInput = $("#userCity").val();

        if (savedCities.includes(userInput)) {
            return;
        } else {
            savedCities.push(userInput);
            var newSearch = $("<button type='button' id='newSearch' class='search-btn btn-sm'>").text(userInput)
            $(".new-div").append(newSearch);
        }
        city.text(userInput + " | ");
        cityName = userInput;

        getWeather(userInput);
        displayDate();

    });

});

//Click event for our city buttons
$(document).on("click", ".search-btn", function () {
    var city = $("#currentCity");
    getWeather($(this).text());
    var citySearch = $(this).text();
    city.text(citySearch + " | ");

});

// Function to display date
function displayDate() {
    var date = moment().format(("M" + "-" + "D" + "-" + "YYYY") + " |");
    $("#currentDate").text(date);
};

// Function that retrieves weather data
function getWeather(userInput) {
    // Current Weather API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log("This is for general weather ", response);
        var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
        console.log(temp)
        $('#temperature').text(temp + "°F");
        var humid = response.main.humidity;
        $("#humidity").text(humid + "%");
        var ws = response.wind.speed;
        $("#windSpeed").text(ws + " mph");
        var icon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#weatherIcon").attr("src", iconURL);
        lat = response.coord.lat;
        lng = response.coord.lon;
        oneCallRequest(lat, lng);
    });

    // One Call API for UVIndex and Current Date
    function oneCallRequest(lat, lng) {
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=e189f3ac24747877cecf335702c81a6e"
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            var uvi = response.current.uvi;
            $("#uvIndex").text(uvi);
            if (uvi <= 2) {
                $("#uvIndex").css({
                    "background-color": "#88BDBC",
                    "padding": "10px 10px 10px 10px",
                    "border": "2px solid #343A3F",

                });
            } else if (uvi <= 5 && uvi > 2) {
                $("#uvIndex").css({
                    "background-color": "#F3D250",
                    "padding": "10px 10px 10px 10px",
                    "border": "2px solid #343A3F",
                });
            } else {
                $("#uvIndex").css({
                    "background-color": "#F78888",
                    "padding": "10px 10px 10px 10px",
                    "border": "2px solid #343A3F",
                });
            };
        });

    };

    // 5-Day Forecast API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response.list)

        for (var i = 0; i < 5; i++) {
            var c = (i * 8);
            var dayDiv = $("#day" + (i + 1));
            var dateDiv = $("#day" + (i + 1)).html(moment().add((i + 1), "days").format("M" + "/" + "D" + "/" + "YYYY"))
            dayDiv.append(dateDiv);
            var iconDiv = $("#weatherIcon" + (i + 1));
            iconDiv.attr("src", "https://openweathermap.org/img/wn/" + response.list[c].weather[0].icon + ".png");
            var tempDiv = $("#tempDay" + (i + 1))
            tempDiv.html(Math.floor((response.list[c].main.temp - 273.15) * 1.80 + 32) + "°F");
            var humidityDiv = $("#humidityDay" + (i + 1));
            humidityDiv.html(response.list[c].main.humidity + "%")

        };
    });
};