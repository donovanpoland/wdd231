// Current weather card
const city = document.getElementById("city");
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
    city.textContent = `${localStorage.getItem("City")} Today`;
    weatherIcon.setAttribute("src", localStorage.getItem("Icon Source"));
    weatherIcon.setAttribute("alt", capitalizeWords(localStorage.getItem("Description")));
    description.textContent = capitalizeWords(localStorage.getItem("Description"));
    temperature.textContent = localStorage.getItem("Current Temperature");
    humidity.textContent = localStorage.getItem("Humidity");
    sunrise.textContent = localStorage.getItem("Sunrise");
    sunset.textContent = localStorage.getItem("Sunset");
 }

export function displayForecastWeather() {
    // Get data from local storage and display it
    // Days forecasted
    forecastTomorrow.innerHTML = `${localStorage.getItem("Tomorrow")},`;
    forecastNext.innerHTML = `${localStorage.getItem("Day After")},`;
    forecastAfter.innerHTML = `${localStorage.getItem("Next Day")},`;
    
    // Highs
    tomorrowHigh.innerHTML = `High: ${localStorage.getItem("Tomorrow High")}&deg;F`;
    nextHigh.innerHTML = `High: ${localStorage.getItem("Day After High")}&deg;F`;
    afterHigh.innerHTML = `High: ${localStorage.getItem("Next Day High")}&deg;F`;

    // Lows
    tomorrowLow.innerHTML = `Low: ${localStorage.getItem("Tomorrow Low")}&deg;F`;
    nextLow.innerHTML = `Low: ${localStorage.getItem("Day After Low")}&deg;F`;
    afterLow.innerHTML = `Low: ${localStorage.getItem("Next Day Low")}&deg;F`;
    
}

// Make words Title Case
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}




