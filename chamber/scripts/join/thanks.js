
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
const timeStamp = getFromData.get('timestamp');

// Optional
const orgTitle = getFromData.get('org-title');

// call functions
displayInfo();

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
    console.log(orgTitle);
    console.log(timeStamp);
}

function displayInfo() {
    // Set timestamp
    document.querySelector("#timestamp").textContent = `Submission Time: ${timeStamp}`;

    // set member name and title if provided
    const fullName = document.querySelector("#title-name");
    if (orgTitle != "") {
        fullName.textContent = `${capitalizeWords(first)} ${capitalizeWords(last)} - ${capitalizeWords(orgTitle)}`;
    }
    else {
        fullName.textContent = `${capitalizeWords(first)} ${capitalizeWords(last)}`;
    }

    // set member Level
    document.querySelector("#level").textContent = `${capitalizeWords(level)}`;

    // set member email
    document.querySelector("#email").textContent = capitalizeWords(email);

    // set company name
    document.querySelector("#company").textContent = capitalizeWords(orgName);

    // set phone number
    document.querySelector("#phone").textContent = phone;
}

// Make words Title Case
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
