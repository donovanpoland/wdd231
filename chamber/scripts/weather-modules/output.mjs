// Get ID's from the page
// Current weather card
const cityName = document.querySelector("#city");
const temperature = document.querySelector("#temp");
const weatherIcon = document.querySelector("#weather-icon");
const description = document.querySelector("#desc");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const time = document.querySelector("#time");
const sunrise = document.querySelector("#sunrise"); 
const sunset = document.querySelector("#sunset"); 

// Forecast card
// Days
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

export function displayCurrentWeather(weatherData) {
    // Get icon and description of weather
    let iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    let desc = weatherData.weather[0].description;

    // Get local time
    const localTime = new Date();
    const formattedTime = localTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Get sunrise
    const sunriseTimestamp = weatherData.sys.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    // Get sunset
    const sunsetTimestamp = weatherData.sys.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    // Display content
    cityName.textContent = `${weatherData.name} Utah`;
    temperature.innerHTML = `${weatherData.main.temp}&deg;F`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute("title", desc);
    description.textContent = `${desc}`;
    high.innerHTML = `High: ${weatherData.main.temp_max}&deg;F`;
    low.innerHTML = `Low: ${weatherData.main.temp_min}&deg;F`;
    humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    time.textContent = `Local time: ${formattedTime}`;
    sunrise.textContent = `Sunrise: ${sunriseTime}`;
    sunset.textContent = `Sunset: ${sunsetTime}`;
    
}

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

export function displayForecastWeather(forecastData) {
    // Get current date
    const localDate = new Date();

    // Get tomorrow
    const tomorrowDate = new Date(localDate);
    tomorrowDate.setDate(localDate.getDate() + 1);
    const tmrw = tomorrowDate.toLocaleDateString("en-US", {
        weekday: "long"
    });

    // Get next day
    const nextDate = new Date(localDate);
    nextDate.setDate(localDate.getDate() + 2);
    const nextDay = nextDate.toLocaleDateString("en-US", {
        weekday: "long"
    });

    // Get day after
    const dateAfter = new Date(localDate);
    dateAfter.setDate(localDate.getDate() + 3);
    const dayAfter = dateAfter.toLocaleDateString("en-US", {
        weekday: "long"
    });

    // Slice 8 forecast blocks per day (3 hours each = 24 hours)
    const firstDay = forecastData.list.slice(0, 8);
    const secondDay = forecastData.list.slice(8, 16);
    const thirdDay = forecastData.list.slice(16, 24);

    const day1 = getDailyHighLow(firstDay);
    const day2 = getDailyHighLow(secondDay);
    const day3 = getDailyHighLow(thirdDay);

    // Set days
    forecastTomorrow.textContent = `${tmrw},`;
    forecastNext.textContent = `${nextDay},`;
    forecastAfter.textContent = `${dayAfter},`;

    // Set temps
    tomorrowHigh.innerHTML = `High: ${day1.high}&deg;F`;
    tomorrowLow.innerHTML = `Low: ${day1.low}&deg;F`;

    nextHigh.innerHTML = `High: ${day2.high}&deg;F`;
    nextLow.innerHTML = `Low: ${day2.low}&deg;F`;

    afterHigh.innerHTML = `High: ${day3.high}&deg;F`;
    afterLow.innerHTML = `Low: ${day3.low}&deg;F`;


}

