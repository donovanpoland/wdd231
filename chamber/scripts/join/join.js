const openButton1 = document.querySelector("#open-button1");
const openButton2 = document.querySelector("#open-button2");
const openButton3 = document.querySelector("#open-button3");
const openButton4 = document.querySelector("#open-button4");
const dialogBox = document.querySelector("#dialog");
const title = document.querySelector("#dialog h2");
const info = document.querySelector("#dialog p");
const benefits = document.querySelector(`#dialog ul`)
const closeButton = document.querySelector("#dialog button");


// Set local time
document.addEventListener("DOMContentLoaded", () => {
    const timeStamp = document.querySelector("#timestamp");

    if (timeStamp) {
        // Create local time string
        const localTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Denver", // Handles MST + MDT automatically
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        // Set time stamp
        timeStamp.value = localTime;
    }
});

openButton1.addEventListener("click", () => {
    dialogBox.showModal();

    //set title
    title.textContent = "Non Profit Organization";

    // add info
    info.textContent = `Our Non-Profit tier is designed for community organizations,
    charities, and educational institutions. Get access to resources
    that help you grow while keeping costs minimal.`;

    // clear out any old items first
    benefits.innerHTML = "";

    // create a UL element
    const ul = document.createElement("ul");
    ul.innerHTML =
        "<li>Basic directory listing</li>" +
        "<li>Monthly tips & resources</li>" +
        "<li>Invited to quarterly meetups</li>";

    // add it inside the benefits container
    benefits.appendChild(ul)
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();

    //set title
    title.textContent = "Bronze Membership";

    // add info
    info.textContent = `The Bronze package is perfect for individuals or small businesses
    who are just getting started and want visibility within our network.`;

    // clear out any old items first
    benefits.innerHTML = "";

    // create a UL element
    const ul = document.createElement("ul");
    ul.innerHTML =
        "<li>Discounted membership rate</li>" +
        "<li>Access to networking events</li>" +
        "<li>Featured in community newsletters</li>";

    // add it inside the benefits container
    benefits.appendChild(ul)
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();

    //set title
    title.textContent = "Silver Membership";

    // add info
    info.textContent = `Silver membership adds more perks to help your business grow. Ideal
    for growing teams who want stronger marketing exposure.`;

    // clear out any old items first
    benefits.innerHTML = "";

    // create a UL element
    const ul = document.createElement("ul");
    ul.innerHTML =
        "<li>Priority directory listing</li>" +
        "<li>Limited access to webinars and workshops</li>" +
        "<li>One featured blog post per year</li>";

    // add it inside the benefits container
    benefits.appendChild(ul)
});

openButton4.addEventListener("click", () => {
    dialogBox.showModal();

    //set title
    title.textContent = "Gold Membership";

    // add info
    info.textContent = `Our Gold package is tailored for businesses that want the full
    premium treatment with maximum visibility and exclusive benefits.`;

    // clear out any old items first
    benefits.innerHTML = "";

    // create a UL element
    const ul = document.createElement("ul");
    ul.innerHTML =
    "<li>Premium directory placement</li>" +
    "<li>Unlimited event access</li>" +
    "<li>Dedicated member spotlight</li>" +
    "<li>1-on-1 consultation sessions</li>";

    // add it inside the benefits container
    benefits.appendChild(ul)
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});