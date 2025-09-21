import { weatherApi, forecastApi } from "./get-urls.mjs";


export async function fetchWeather() { 
    // Fetch weather data from OpenWeather API
    const weatherResponse = await fetch(weatherApi);

    // Store the data
    const weatherData = await weatherResponse.json();
    // Log to console - Debugging
    console.log("Current Weather API Response:", weatherData);

    return weatherData;
}

export async function fetchForecast() { 
    // Fetch forecast data from OpenWeather API
    const forecastResponse = await fetch(forecastApi);

    // Store the data
    const forecastData = await forecastResponse.json();

    // Log to console - Debugging
    console.log("Forecast API Response:", forecastData);
    return forecastData;
}