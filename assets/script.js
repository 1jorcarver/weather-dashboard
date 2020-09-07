var currentForecast = document.querySelector(".current-forecast")
var forecastTitle = document.querySelector(".forecast-title");
var futureForecast = document.querySelector(".future-forecast");
var input = document.querySelector(".input");
var searchBtn = document.querySelector(".btn");
var previousSearch = document.querySelector(".previous-search");
var today = new Date().toLocaleDateString();

// add function to retrieve current weather
function currentWeather(input) {

    // empty displays after search
    currentForecast.textContent = "";
    forecastTitle.textContent = "";
    futureForecast.textContent = "";

    queryUrl = "https://api.openweathermap.org/data/2.5/weather?" + input + "&appid=2817bf3faec94fe14a480f64a719b193"

    fetch(queryUrl, {
        method: "GET"
    }).then(data => data.json())
        .then(function (response) {

            // current weather condition
            var weatherCondition = response.weather[0].main

            // weather conditions icon
            var weatherIcon = document.createElement("i")

            if (weatherCondition === "Clear") {
                weatherIcon.className = "fas fa-sun"
            } else if (weatherCondition === "Clouds") {
                weatherIcon.className = "fas fa-cloud-sun"
            } else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
                weatherIcon.className = "fas fa-cloud-rain"
            } else if (weatherCondition === "Snow") {
                weatherIcon.className = "fas fa-snowflake"
            } else if (weatherCondition === "Thunderstorm") {
                weatherIcon.ClassName = "fas fa-bolt"
            }

            // Retrieve and convert temps
            var temp = parseInt(response.main.temp)
            temp = (temp - 273.15) * 9 / 5 + 32
            temp = temp.toFixed(2)
            var tempEl = document.createElement("p")
            tempEl.textContent = "Temperature: " + temp + " °F"

            var humidity = response.main.humidity
            var humidityEl = document.createElement("p")
            humidityEl.textContent = "Humidity: " + humidity + "%"

            var windSpeed = response.wind.speed
            var speedEl = document.createElement("p")
            speedEl.textContent = "Wind Speed: " + windSpeed + "MPH"

            var cityName = response.name
            var cityEl = document.createElement("h2")
            cityEl.textContent = "cityName " + " " + "(" + today + ")"

            var heading = document.createElement("div")
            heading.className = "heading"
            heading.append(cityEl, weatherIcon)

            currentForecast.className = "current-forecastBorder"

            currentForecast.append(heading)
            currentForecast.append(temp)
            currentForecast.append(humidityEl)
            currentForecast.append(speedEl)

            var latitude = response.coord.latitude
            var longitude = response.coord.longitude

            // Call the UV Index API
            uvUrl = "https://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + latitude + "&lon=" + longitude + "&appid=2817bf3faec94fe14a480f64a719b193"

            fetch(uvUrl, {
                method: "GET"
            }).then(data => data.json())
                .then(function (result) {

                    var uv = result.value
                    var uvSpan = document.createElement("span")

                    if (uv < 3) {
                        uvSpan.className = "uvGreen"
                        uvSpan.textContent = uv
                    } else if (uv <= 5) {
                        uvSpan.className = "uvYellow"
                        uvSpan.textContent = uv
                    } else {
                        uvSpan.className = "uvRed"
                        uvSpan.textContent = uv
                    }

                    var uvEl = document.createElement("p");
                    uvEl.textContent = "UV Index: "
                    uvEl.append(uvSpan)
                    currentForecast.append(uvEl)
                })
        })


    fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?" + input + "&appid=2817bf3faec94fe14a480f64a719b193"

    // 5-Day Forecast fetch call
    fetch(fivedayUrl, {
        method: "GET"
    })
        .then(data => data.json())
        .then(function (response) {

            // counter for the date
            d = 0

            for (let i = 6; i < response.list.length; i += 8) {

                d += 1

                var tmw = new Date();
                tmw.setDate(tmw.getDate() + d)
                var nextDay = document.createElement("p")
                nextDay.textContent = tmw.toLocaleDateString()
                nextDay.className = "blueCardText"

                var blueCard = document.createElement("div")
                blueCard.className = "blueCard"

                var temp = parseInt(response.list[i].main.temp)
                temp = (temp - 273.15) * 9 / 5 + 32
                temp = temp.toFixed(0);
                var tempEl = document.createElement("p")
                tempEl.textContent = "Temp: " + temp + " °F";
                tempEl.className = "blueCardText"

                var humidity = response.list[i].main.humidity;
                var humidityEl = document.createElement("p")
                humidityEl.textContent = "Humidity: " + humidity + "%";
                humidityEl.className = "blueCardText"

                var weatherForecast = response.list[i].weather[0].main
                var weatherIcon = document.createElement("i")

                if (weatherForecast === "Clear") {
                    weatherIcon.className = "fas fa-sun"
                } else if (weatherForecast === "Clouds") {
                    weatherIcon.className = "fas fa-cloud-sun"
                } else if (weatherForecast === "Rain" || weatherForecast === "Drizzle") {
                    weatherIcon.className = "fas fa-cloud-rain"
                } else if (weatherForecast === "Snow") {
                    weatherIcon.className = "fas fa-snowflake"
                } else if (weatherForecast === "Thunderstorm") {
                    weatherIcon.ClassName = "fas fa-bolt"
                }
                weatherIcon.className = "weatherIcon"

                blueCard.append(nextDay, weatherIcon, tempEl, humidityEl)
                futureForecast.append(blueCard)
            }
        });
}

searchBtn.addEventListener("click", function () {
    var userInput = input.value.trim()

    btnStorage.push(userInput)

    localStorage.setItem("Cities", btnStorage)

    userInput = "q=" + userInput;
    currentWeather(userInput)

    input.value = ""
});

var btnStorage = []

window.onload = function () {
    
    var cityNameStorage = localStorage.getItem("Cities")
    var cityBtn = cityNameStorage.split(",")
    cityBtn.forEach(function (name) {
        var btn = document.createElement("button");
        btn.className = name
        btn.textContent = name
        previousSearch.prepend(btn)
        btnStorage.push(name)
    })
}

previousSearch.addEventListener("click", function (event) {
    var eventTarget = event.target.className;

    eventTargetValue = "q=" + eventTarget;

    currentWeather(eventTargetValue);
})