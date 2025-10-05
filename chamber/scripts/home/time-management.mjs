// Function to update local time
export function updateLocalTime() {
    // Set local time
    const localTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Denver", // Handles MST + MDT automatically
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    // Get local time id from page and write time one page
    const timeDisplay = document.querySelector("#local-time");
    if (timeDisplay) {
        timeDisplay.textContent = localTime;
    }
}

export function createTimeStamp() {
  const currentTime = Date.now();
  localStorage.setItem("Timestamp", currentTime.toString());
  console.log("Timestamp created/updated:", currentTime);
}

export function isTimeStampExpired() {
  const stored = localStorage.getItem("Timestamp");

  // If time stamp isn't in stored data but other data is, add time stamp and refresh data
  if (!stored) {
    console.log("No timestamp found — data considered expired.");
    return true;
  }

  const currentTime = Date.now();
  const storedTime = Number(stored);
  const hoursPassed = (currentTime - storedTime) / (1000 * 60 * 60);

  // if 3 hours have passed return timeStampeExpired() as true
  if (hoursPassed > 3) {
    console.log(`Timestamp expired: ${hoursPassed.toFixed(2)} hours have passed.`);
    return true;
  }

  // ALways return false unless condition above is met
  console.log(`Timestamp still valid: ${hoursPassed.toFixed(2)} hours have passed.`);
  return false;
}

// Get the name of the weekday
export function getDayName(baseDate, offset) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}