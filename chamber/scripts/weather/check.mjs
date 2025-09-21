import { displayCurrentWeather, displayForecastWeather } from "./display-weather.mjs";
import { storeForecastData, storeWeatherData } from "./store-weather.mjs";
import { createTimeStamp } from "../time-management.mjs";

export async function CheckStoredData() {

    // Expected keys to stored weather data
    const requiredKeys = [
        "City",
        "Icon Source",
        "Description",
        "Current Temperature",
        "Sunrise",
        "Sunset",
        "Humidity",
        "Tomorrow",
        "Day After",
        "Next Day",
        "Tomorrow High", 
        "Tomorrow Low",
        "Day After High", 
        "Day After Low",
        "Next Day High",
        "Next Day Low"
    ];

    // Check if all required keys exist
    const hasAllKeys = requiredKeys.every(key => localStorage.getItem(key) !== null);

    if (!hasAllKeys) { // will always trigger with new users
        console.log("Missing required data, fetching new data.");
        // Set new timestamp
        createTimeStamp();
        // Store fresh data
        await storeWeatherData();
        await storeForecastData();
        // Display stored data
        displayCurrentWeather();
        displayForecastWeather();
    } else if (createTimeStamp()) { // Will trigger if time stamp is expired
        // Refresh data
        await storeWeatherData();
        await storeForecastData();
        // Display newly stored data
        displayCurrentWeather();
        displayForecastWeather();
    } else { // Will trigger if data is not expired
        displayCurrentWeather();
        displayForecastWeather();
    }
}