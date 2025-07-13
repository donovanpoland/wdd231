
// Name url data from json file name
const url = `data/members.json`;
// Find grid and list view ids on document for listeners
const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");

// Keep track of the number of active timeouts
let activeTimeouts = [];

// Load content after DOM has loaded to avoid layout shifts
window.addEventListener("DOMContentLoaded", getMemberData);


/* Create functions */

// Display in grid format
function displayGrid(members) {
    const cards = document.querySelector(".directory");
    cards.style.display = "grid"


    // Erase all old data
    cards.innerHTML = "";

    // Inject first 4 cards right away to avoid large layout shifts, slowly load others
    // console.log("Injecting first card:", members[0].name);
    createCard(members[0], 0, cards);
    // console.log("Injecting second card:", members[1].name);
    createCard(members[1], 1, cards);
    // console.log("Injecting third card:", members[2].name);
    createCard(members[2], 2, cards);
    // console.log("Injecting fourth card:", members[3].name);
    createCard(members[3], 3, cards);

    // Create member info
    members.slice(4).forEach((member, index) => {
        const timeout = setTimeout(() => {
            createCard(member, index + 1, cards);
        }, index * 700);
        activeTimeouts.push(timeout);
    });
}

// Display in list format
function displayList(members) {
    const row = document.querySelector(".directory");
    row.style.display = "flex";
    row.style.flexDirection = "column";

     // Erase all old data
    row.innerHTML = "";

    // Create member info
    members.forEach((member, index) => {
        const timeout = setTimeout(() => {
        
        // Create a new card
        const listStyle = document.createElement("section")
        listStyle.classList.add("list-style");

        // List items
        const items = [
            `<h2>${member.name}</h2>`,
            `${member.address.street}<br>${member.address.city}
                ${member.address.state}, ${member.address.zip}`,
            member.phone
        ];

        // Create a list
        const list = document.createElement("ul");

        // Add items to the list
        items.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = item;
            list.appendChild(listItem);

            if (item.includes(member.address.street)) {
                listItem.classList.add("address");
            }
        });

        // Website data
        const website = document.createElement("a");
        website.setAttribute("href", member.https);
        website.setAttribute("target", "_blank");
        website.textContent = member.website;

        // Create website list item
        const websiteItem = document.createElement("li");
        websiteItem.appendChild(website);
        list.appendChild(websiteItem);

        // create image list item
        const imageItem = document.createElement("img");
        imageItem.setAttribute("src", member.image)
        imageItem.setAttribute("alt", `Logo of ${member.name}`)
        imageItem.setAttribute("loading", "lazy");
        imageItem.setAttribute("id", "image-item");
        imageItem.setAttribute("width", "125");
        imageItem.setAttribute("height", "125");
        list.appendChild(imageItem);
        
        // Add to card
        listStyle.appendChild(list);

        // Add to page
        row.appendChild(listStyle);
        }, index * 300);
        activeTimeouts.push(timeout);
    }); 
}

// Load file
async function getMemberData() {
    
    // Get data from json file
    const response = await fetch(url);
    const data = await response.json();

    // Log data(jason file) to console in table format to the console
    // console.table(data.members);

    // Default display selection
    displayGrid(data.members);
    // displayList(data.members);
    
    // If user selects list view
    listView.addEventListener("click", () => {
        // Cancel running timeouts
        clearScheduled(); 

        // Adjust aria attributes
        gridView.setAttribute("aria-pressed", "false");
        listView.setAttribute("aria-pressed", "true");

        // Replace with grid data
        displayList(data.members);
    });

    // If user selects grid view
    gridView.addEventListener("click", () => {
        // Cancel running timeouts
        clearScheduled(); 

        // Adjust aria attributes
        gridView.setAttribute("aria-pressed", "true");
        listView.setAttribute("aria-pressed", "false");

        // Replace with grid data
        displayGrid(data.members);
    });
}

// Clear list of timers
function clearScheduled() {
  activeTimeouts.forEach(timeout => clearTimeout(timeout));
  activeTimeouts = [];
}

// Create new card
function createCard(member, index, container) {
    // Create a new card
    const card = document.createElement("section");
    card.classList.add("card");
    if (index > 3) {
        card.classList.add("animate");
    }

    // Image
    const img = document.createElement("img");
    img.setAttribute("src", member.image);
    img.setAttribute("alt", `Logo of ${member.name}`);
    img.setAttribute("width", "300");
    img.setAttribute("height", "300");

    // Only preload the first image, lazy load all other images
    if (index === 0) {
        img.setAttribute("id", "first-image");
        img.setAttribute("fetchpriority", "high");
        // console.log('Rendering first card')
    } else {
        img.setAttribute("loading", "lazy");
    }

    // Business Name
    const name = document.createElement("h2");
    name.textContent = member.name

    // Create address tag for convention
    const addTag = document.createElement("address");

    // Address
    const address = document.createElement("p");
    address.classList.add("address");
    address.innerHTML =
        `${member.address.street}, ${member.address.city}<br>
        ${member.address.state}, ${member.address.zip}`;

    // Phone
    const phone = document.createElement("p");
    phone.classList.add("phone");
    phone.textContent = member.phone;

    // Website
    const website = document.createElement("a");
    website.setAttribute("href", member.https);
    website.setAttribute("target", "_blank");
    website.textContent = member.website;

    // Add elements to address
    addTag.appendChild(address);
    addTag.appendChild(phone);

    // Add address tag to the card
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(addTag);
    card.appendChild(website);

    // Add the card to the page
    container.appendChild(card);
}