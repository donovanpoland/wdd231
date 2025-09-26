// Get data from search bar after get method from form
// This data is visable to anyone when "get" is used 
const getString = window.location.search;
// Display string in console
console.log(getString);

// convert
const myInfo = new URLSearchParams(getString);
console.log(myInfo);

// log to console to see if it works
console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));
console.log(myInfo.get('ordinance'));
console.log(myInfo.get('date'));
console.log(myInfo.get('location'));

// place info in variables for shorter template literal
const first = myInfo.get('first');
const last = myInfo.get('last');
const phone = myInfo.get('phone');
const email = myInfo.get('email');
const ordinance = myInfo.get('ordinance');
const date = myInfo.get('date');
const templeLocation = myInfo.get('location');

// display results on page
const results = document.querySelector("#results");
results.innerHTML =
    `<p>Appointment for ${first} ${last} Confirmed</p>
<p>Proxy ${ordinance} on ${date} in the ${templeLocation}</p>
<p>Your Phone: ${phone}</p>
<p>Your Email: ${email}</p>`;
