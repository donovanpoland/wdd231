
// Get data from search bar after get method from form
// This data is visible to anyone when "get" is used (no Sensitive data)
const getFromData = new URLSearchParams(window.location.search);

// Place info in variables for shorter template literal
// Required
const first = getFromData.get('fname');
const last = getFromData.get('lname');
const email = getFromData.get('email');
const phone = getFromData.get('phone');
const orgName = getFromData.get('org-name');
const level = getFromData.get('member-level');
const description = getFromData.get('description');

// Optional
const orgTitle = getFromData.get('org-title');





// Debugging
logParamsListener();
function logParamsListener() {
    console.log(first);
    console.log(last);
    console.log(email);
    console.log(phone);
    console.log(orgName);
    console.log(level);
    console.log(description);
    console.log(orgTitle)
}

