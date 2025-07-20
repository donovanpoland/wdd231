import url from './url.mjs';
import { canMakeApiCall, hasCooldownPassed } from './apicall.mjs';
import { displayResults } from './output.mjs';



// Call functions
if (canMakeApiCall() && hasCooldownPassed()) {
    apiFetch();
} else {
    console.log("Cooldown active or limit hit. Refresh in 10 seconds.");
}

async function apiFetch() {
    try {
        // Fetch data from json file
        const response = await fetch(url);
        console.log("apiFetch called");

        // If there is no response throw status and API error
        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Status: ${response.status} - ${message}`);
        }
        else {
             // Store in variable - Success
            const data = await response.json();
            // Log to console - Debugging
            console.log("API Response:", data);
            // Display the results
            displayResults(data);
        }
    }
    //catch any errors
    catch (error){
        console.error("Error loading data:", error);
    } 
}


