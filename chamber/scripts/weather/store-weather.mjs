import { getDayName } from "../time-management.mjs";
import { fetchForecast, fetchWeather } from "./get-weather.mjs";


export async function storeWeatherData() {
    // Fetch data
    const weatherData = await fetchWeather();

    // Set city
    localStorage.setItem("City", weatherData.name);

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

    // Get local date
    const localDate = new Date();

    // forecastData.list[0].dt = midnight aka 00:00 the next day
    // let dt = forecastData.list[0].dt;
    // console.log(new Date(dt * 1000));
    // url = &cnt=23
    // this data will always be the next 3 days

    // Slice 8 forecast blocks per day (3 hours each = 24 hours)
    const firstDay = forecastData.list.slice(0, 8);
    const secondDay = forecastData.list.slice(8, 16);
    const thirdDay = forecastData.list.slice(16, 24);

    // Add list to function to find high and low for the day
    const tomorrow = getDailyHighLow(firstDay);
    const dayAfter = getDailyHighLow(secondDay);
    const nextDay = getDailyHighLow(thirdDay);

    // Set days
    localStorage.setItem("Tomorrow", getDayName(localDate, 1))
    localStorage.setItem("Day After", getDayName(localDate, 2))
    localStorage.setItem("Next Day", getDayName(localDate, 3))

    // Set temps
    localStorage.setItem("Tomorrow High", tomorrow.high);
    localStorage.setItem("Tomorrow Low", tomorrow.low);
    localStorage.setItem("Day After High", dayAfter.high);
    localStorage.setItem("Day After Low", dayAfter.low);
    localStorage.setItem("Next Day High", nextDay.high);
    localStorage.setItem("Next Day Low", nextDay.low);

}

// Get forecasts highs and lows
function getDailyHighLow(forecastList) {
    let high = -Infinity;
    let low = Infinity;

    forecastList.forEach(item => {
        const temp = item.main.temp;
        if (temp > high) high = temp;
        if (temp < low) low = temp;
    });

    return {
        high: Math.round(high),
        low: Math.round(low)
    };
}