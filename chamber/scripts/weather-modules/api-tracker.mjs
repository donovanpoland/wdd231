const API_TYPES = {
    OPEN_WEATHER_CURRENT: 'ow_current',
    OPEN_WEATHER_FORECAST: 'ow_forecast',
    OPEN_WEATHER_TILE: 'ow_tile',
    GOOGLE_MAPS: 'gmaps',
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getMinuteKey() {
  return new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
}

// Increment the API usage counters
function incrementCounter(apiType) {
  const todayKey = `${apiType}_today_${getTodayKey()}`;
  const minuteKey = `${apiType}_per_min`;

  const minute = getMinuteKey();

  let current = JSON.parse(localStorage.getItem(minuteKey)) || {};
  current[minute] = (current[minute] || 0) + 1;

  localStorage.setItem(minuteKey, JSON.stringify(current));

  const daily = parseInt(localStorage.getItem(todayKey) || '0');
  localStorage.setItem(todayKey, daily + 1);
}

// Retrieve current usage counts
function getCounts(apiType) {
  const todayKey = `${apiType}_today_${getTodayKey()}`;
  const minuteKey = `${apiType}_per_min`;

  const minute = getMinuteKey();
  const minuteData = JSON.parse(localStorage.getItem(minuteKey)) || {};

  return {
    daily: parseInt(localStorage.getItem(todayKey) || '0'),
    minute: parseInt(minuteData[minute] || 0),
  };
}

export {
  API_TYPES,
  incrementCounter,
  getCounts,
};