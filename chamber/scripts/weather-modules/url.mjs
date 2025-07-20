import { apiKey } from "../../../scripts/api-key.mjs";

// Mapleton, UT, USA
//40.13027407651857, -111.57884204921159
const lat = 40.130;
const lon = -111.578;

export const weatherData =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

export const forecastData =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

