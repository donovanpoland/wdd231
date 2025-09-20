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

// Determine if a new time stamp is need on local storage and place one
// Return true or false if time stamp has elapsed by 3 hours
// Used to determine if new api call is needed or if local storage contains relevant data
export function createTimeStamp() {
    
    // Current time in ms
    const currentTime = Date.now();

    // Get the stored timestamp if any
    const stored = localStorage.getItem("Timestamp");
    // Should a new API call be made? true/false
    if (stored) {
        // Convert string to number
        const storedTime = Number(stored);
        const hoursPassed = (currentTime - storedTime) / (1000 * 60 * 60);

        if (hoursPassed > 3) {
            localStorage.setItem("Timestamp", currentTime);
            console.log("updated expired timestamp.");
            return true;
        } else {
            console.log("Timestamp still valid.");
            return false;
        }
    } else {
        // No time stamp yet, save a new one
        localStorage.setItem("Timestamp", currentTime);
        console.log("Created initial timestamp.");
        return true;
    }
}