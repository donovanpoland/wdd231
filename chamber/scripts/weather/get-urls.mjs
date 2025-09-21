import { apiKey } from "./api-key.mjs";

// Park City, UT, USA
// 40.65273838206213, -111.5018944690332
const lat = 40.652;
const lon = -111.501;

export const weatherApi =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

export const forecastApi =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=24&appid=${apiKey}`;

