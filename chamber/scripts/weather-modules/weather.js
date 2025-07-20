import { weatherData, forecastData } from "./url.mjs";
import { displayCurrentWeather, displayForecastWeather } from "./output.mjs";
import { API_TYPES, incrementCounter } from './api-tracker.mjs';

// Delay API fetch on page load
const timeout1 = setTimeout(() => {
    fetchWeather();
}, 2000);

const timeout2 = setTimeout(() => {
    fetchForecast();
}, 3000);

async function fetchWeather() {
    // Count API usage
    incrementCounter(API_TYPES.OPEN_WEATHER_CURRENT);
    try {
        // Fetch weather data from json file
        const response1 = await fetch(weatherData);
        console.log("Weather API fetch called");
        

        // If there is no response throw status and API error
        if (!response1.ok) {
            const message = await response1.text();
            throw new Error(`Status: ${response1.status} - ${message}`);
        }
        else {
            // Store in variable - Success
            const weatherData = await response1.json();
            // Log to console - Debugging
            console.log("Current Weather API Response:", weatherData);
            // Display the results
            displayCurrentWeather(weatherData);
        }
    }
    //catch any errors
    catch (error) {
        console.error("Error loading data:", error);
    }
}

async function fetchForecast() {
    incrementCounter(API_TYPES.OPEN_WEATHER_FORECAST);
    try {
        // Fetch forecast data from json file
        const response2 = await fetch(forecastData);
        console.log("Forecast API fetch called");
        // If there is no response throw status and API error
        if (!response2.ok) {
            const message = await response2.text();
            throw new Error(`Status: ${response2.status} - ${message}`);
        }
        else {
            // Store in variable - Success
            const forecastData = await response2.json();
            // Log to console - Debugging
            console.log("Forecast API Response:", forecastData);
            // Display the results
            displayForecastWeather(forecastData);
        }
    }
    //catch any errors
    catch (error) {
        console.error("Error loading data:", error);
    }
}
