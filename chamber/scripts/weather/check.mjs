import { displayCurrentWeather, displayForecastWeather } from "./display-weather.mjs";
import { storeForecastData, storeWeatherData } from "./store-weather.mjs";
import { createTimeStamp, isTimeStampExpired } from "../home/time-management.mjs";

export async function checkStoredData() {

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


    if (!hasAllKeys || isTimeStampExpired()) {
        await storeWeatherData();
        await storeForecastData();
        createTimeStamp(); // reset after fetching
    }

  // Always display whatever is currently in storage (fresh or cached)
  displayCurrentWeather();
  displayForecastWeather();
}