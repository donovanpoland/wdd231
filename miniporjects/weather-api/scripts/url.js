import { apiKey } from '../../../scripts/api-key.js';

// Trier, Germany
const lat = 49.75;
const lon = 6.64;

const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;


export default url;