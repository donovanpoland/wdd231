import { fetchForecast, fetchWeather } from "./get-weather.mjs";

export async function storeWeatherData() {
    // Fetch data
    const weatherData = await fetchWeather();

    // Set city
    // localStorage.setItem("City", weatherData.name);

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
    localStorage.setItem("Humidity", weatherData.main.humidity);
}

export async function storeForecastData() {
    // Fetch data
    const forecastData = await fetchForecast();
}