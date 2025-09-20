import { updateLocalTime, createTimeStamp } from "./time-management.mjs";
import { fetchMemberData } from "./display-data.mjs";
import { fetchWeather, fetchForecast } from "./weather/weather.mjs";


// Update time every 30 seconds to display on page
// Load js after Dom is loaded
window.addEventListener("DOMContentLoaded", () => {
    // Run once immediately and then every 30 seconds
    updateLocalTime();
    setInterval(updateLocalTime, 30000);
    

    if (createTimeStamp() === true) {
        
    } else { return }
    

});

fetchWeather();
fetchForecast();
fetchMemberData();


