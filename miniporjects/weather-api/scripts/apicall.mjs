
//further limit API calls per device per day

export function canMakeApiCall() {
  const limit = 100; // Daily cap
  const resetTime = 24 * 60 * 60 * 1000; // 24 hours

  const now = Date.now();
  let calls = parseInt(localStorage.getItem('weatherApiCallsToday')) || 0;
  let lastReset = parseInt(localStorage.getItem('weatherApiLastReset')) || 0;

  // Reset daily
  if (now - lastReset > resetTime) {
    calls = 0;
    lastReset = now;
    localStorage.setItem('weatherApiCallsToday', '0');
    localStorage.setItem('weatherApiLastReset', now.toString());
  }

  if (calls >= limit) {
    console.warn("API call limit reached for the day.");
    return false;
  }

  // Update the call count
  localStorage.setItem('weatherApiCallsToday', (calls + 1).toString());
  return true;
}

export function hasCooldownPassed(seconds = 10) {
  const lastCall = parseInt(localStorage.getItem('lastWeatherCall')) || 0;
  const now = Date.now();

  if (now - lastCall < seconds * 1000) {
    return false;
  }

  localStorage.setItem('lastWeatherCall', now.toString());
  return true;
}