import { weatherApi, forecastApi } from "./get-urls.mjs";


export async function fetchWeather() { 
    try {
        // Fetch weather data from OpenWeather API
        const weatherResponse = await fetch(weatherApi);

        // Store the data
        const weatherData = await weatherResponse.json();
        // Log to console - Debugging
        console.log("Current Weather API Response:", weatherData);
        return weatherData;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

export async function fetchForecast() { 
    try {
        // Fetch forecast data from OpenWeather API
        const forecastResponse = await fetch(forecastApi);

        // Store the data
        const forecastData = await forecastResponse.json();

        // Log to console - Debugging
        // console.log("Forecast API Response:", forecastData);
        return forecastData;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}