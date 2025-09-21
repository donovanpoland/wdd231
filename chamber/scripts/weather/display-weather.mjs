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
    weatherIcon.setAttribute("alt", capitalizeWords(localStorage.getItem("Description")));
    description.textContent = capitalizeWords(localStorage.getItem("Description"));
    temperature.textContent = localStorage.getItem("Current Temperature");
    humidity.textContent = localStorage.getItem("Humidity");
    sunrise.textContent = localStorage.getItem("Sunrise");
    sunset.textContent = localStorage.getItem("Sunset");
 }

export function displayForecastWeather() { }

// Make words Title Case
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// forecastData.list[0].dt = midnight of the current date
// let dt = forecastData.list[0].dt;
// console.log(new Date(dt * 1000));
// this data will always be the next 5 days


