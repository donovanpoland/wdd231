import { updateLocalTime} from "./time-management.mjs";
import { fetchMemberData } from "./display-data.mjs";
import { CheckStoredData } from "./weather/check.mjs";




// Update time every 30 seconds to display on page
// Load js after Dom is loaded
window.addEventListener("DOMContentLoaded", () => {
    // Run once immediately and then every 30 seconds
    updateLocalTime();
    setInterval(updateLocalTime, 30000);
    // Check if there is stored data then fetch or display it
    CheckStoredData();
    fetchMemberData();
});
