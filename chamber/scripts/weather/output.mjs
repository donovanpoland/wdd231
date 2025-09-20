import { fetchWeather, fetchForecast } from "./weather.mjs";

// Current weather card
const weatherIcon = document.getElementById("weather-icon");
const description = document.getElementById("desc");
const temperature = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise"); 
const sunset = document.getElementById("sunset");

// Forecast card
const forecastTomorrow = document.getElementById("forecastTomorrow");
const forecastNext = document.getElementById("forecastNext");
const forecastAfter = document.getElementById("forecastAfter");
// Highs - lows
const tomorrowHigh = document.getElementById("tomorrowHigh");
const tomorrowLow = document.getElementById("tomorrowLow");
const nextHigh = document.getElementById("nextHigh");
const nextLow = document.getElementById("nextLow");
const afterHigh = document.getElementById("afterHigh");
const afterLow = document.getElementById("afterLow");


export function displayCurrentWeather() {
    // Get data from local storage and display it
    weatherIcon.setAttribute("src", localStorage.getItem("Icon Source"));
    weatherIcon.setAttribute("alt", localStorage.getItem("Description"));
    description.textContent = localStorage.getItem("Description");
    temperature.textContent = localStorage.getItem("Current Temperature");
    humidity.textContent = localStorage.getItem("Humidity");
    sunrise.textContent = localStorage.getItem("Sunrise");
    sunset.textContent = localStorage.getItem("Sunset");
 }

export function displayForecastWeather() { }

export async function storeData() {
    // Fetch data
    const weatherData = await fetchWeather();
    const forecastData = await fetchForecast();

    // Set weather icon source
    localStorage.setItem("Icon Source", `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);

    // Set weather description
    localStorage.setItem("Description", weatherData.weather[0].description);

    // Set temperature
    localStorage.setItem("Current Temperature", weatherData.main.temp);

    // Get sunrise
    const sunriseTimestamp = weatherData.sys.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    // Get sunset
    const sunsetTimestamp = weatherData.sys.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    // Set sunrise/sunset
    localStorage.setItem("Sunrise", sunriseTime);
    localStorage.setItem("Sunset", sunsetTime);  

    // Set humidity
    localStorage.setItem("Humidity", weatherData.main.humidity)
}


// forecastData.list[0].dt = midnight of the current date
// let dt = forecastData.list[0].dt;
// console.log(new Date(dt * 1000));
// this data will always be the next 3 days


