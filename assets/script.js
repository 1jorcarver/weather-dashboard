var currentForecast = document.querySelector(".current-forecast")
var forecastTitle = document.querySelector(".forecast-title");
var futureForecast = document.querySelector(".future-forecast");
var input = document.querySelector(".input");

// add function to retrieve current weather
function currentWeather(input) {
    
    // empty displays after search
    currentForecast.textContent = "";
    forecastTitle.textContent = "";
    futureForecast.textContent = "";

    queryUrl = "http://api.openweathermap.org/data/2.5/weather?" + input + "&appid=2817bf3faec94fe14a480f64a719b193"

    fetch(queryUrl, {
        method: "GET"
    })
    .then(data => data.json())
        
        .then(function (response) {

            // current weather condition
            var weatherCondition = response.weather[0].main

            // weather conditions icon
            var weatherIcon = document.createElement("i")

            if (weatherCondition === "Clear") {
                weatherIcon.class = "fas fa-sun"
            } else if (weatherCondition === "Clouds") {
                weatherIcon.class = "fas fa-cloud-sun"
            } else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
                weatherIcon.class = "fas fa-cloud-rain"
            } else if (weatherCondition === "Snow") {
                weatherIcon.class = "fas fa-snowflake"
            } else if (weatherCondition === "Thunderstorm") {
                weatherIcon.class = "fas fa-bolt"
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
            speedEl.textContent = "Wind Speed: " + humidity + "MPH"

            var cityName = response.name
            var cityEl = document.createElement("h2")
            cityEl.textContent = "cityName " + " " + "(" + today + ")"

            var heading = document.createElement("div")
            heading.className = "heading"
            heading.append(cityText, weatherIcon)

            currentForecast.className = "current-forecastBorder"

            currentForecast.append(heading)
            currentForecast.append(temp)
            currentForecast.append(humidityEl)
            currentForecast.append(speedEl)

            var latitude = response.coord.latitude
            var longitude = response.coord.longitude

            

    })

}