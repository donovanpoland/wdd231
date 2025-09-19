import { fetchMemberData } from "./display-data.mjs"; 


//load js after Dom is loaded
window.addEventListener("DOMContentLoaded", () => {
    // Function to update local time
    function updateLocalTime() {
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

    // Run once immediately and then every 30 seconds
    updateLocalTime();
    setInterval(updateLocalTime, 30000);
});

fetchMemberData();