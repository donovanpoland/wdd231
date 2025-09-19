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