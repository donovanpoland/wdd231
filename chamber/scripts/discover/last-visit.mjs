

function getVisitMessage(lastVisit, now) {
    // Check for last visit
    if (!lastVisit) {
        // First visit
        return "Welcome! Discover what Park City has to offer!";
    }
        // Convert to int for date math
        const lastVisitDate = parseInt(lastVisit);
        // Compare last visit and current date
        const difference = now - lastVisitDate;
        // Set of the number of days since last visit
        const numberOfDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        
         // Return message based on time difference
    if (numberOfDays < 1) {
        // Less than a day
        return "Back so soon? Great, here is what Park City has to offer!";
    } else if (numberOfDays === 1) {
        // Only 1 day
         return "You last visited 1 day ago. Welcome Back.";
    } else {
         // More than 1 day
        return `You last visited ${numberOfDays} days ago. Welcome Back, here is what Park City has to offer!`;
    }
}

export function displayVisitMessage() {
    // Select element on the page to be updated
    const visits = document.querySelector("#visit-message");

    // Check local storage for lastVisit
    const lastVisit = localStorage.getItem("lastVisit");
    // Debug - show value of last visit
    // console.log(`last visit ${lastVisit}`);

    // Set current date
    const now = Date.now();
    // Debug - show time in ms
    // console.log(`current date/time ${now}`);

    // Update content of visit element
    visits.textContent = getVisitMessage(lastVisit, now);
    // Update visit date
    setVisitDate(now);
    // Debug - show current message
    // console.log(visits);
}

function setVisitDate(now) {
    // Set last visit in local storage
    localStorage.setItem("lastVisit", now.toString());
}
