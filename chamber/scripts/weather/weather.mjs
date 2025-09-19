import { weatherApi, forecastApi } from "./url.mjs";
import { displayCurrentWeather, displayForecastWeather } from "./output.mjs";

export async function fetchWeather() { 
    // Fetch weather data from OpenWeather API
    const weatherResponse = await fetch(weatherApi);

    // Store the data
    const weatherData = await weatherResponse.json();
    // Log to console - Debugging
    console.log("Current Weather API Response:", weatherData);
    // Display data on page
    displayCurrentWeather(weatherData);
}

export async function fetchForecast() { 
    // Fetch forecast data from OpenWeather API
    const forecastResponse = await fetch(forecastApi);

    // Store the data
    const forecastData = await forecastResponse.json();

    // Log to console - Debugging
    console.log("Forecast API Response:", forecastData);
    // Display data on page
    displayForecastWeather(forecastData);
}