
// Name url data from json file name
const url = `data/members.json`;
// Find directory insertion class on document
const cards = document.querySelector(".directory");
// Find grid and list view ids on document for listeners
const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");


// Call functions
getMemberData();


/* Create functions */

// Display in grid format
function displayGrid(members) {
    const cards = document.querySelector(".directory");
    cards.style.display = "grid"
    cards.style.gridTemplateColumns = "repeat(auto-fit, minmax(350px, 1fr))";
    cards.style.gap = "1rem"

    // Create member info
    members.forEach(member => {
        // Create a new card
        const card = document.createElement("section");
        card.classList.add("card");


        // Image
        const img = document.createElement("img");
        img.setAttribute("src", member.image)
        img.setAttribute("alt", `Logo of ${member.name}`)
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "300");
        img.setAttribute("height", "300");

        // Business Name
        const name = document.createElement("h2");
        name.textContent = member.name;

        // Create address tag for convention
        const addTag = document.createElement("address");

        // Address
        const address = document.createElement("p");
        address.classList.add("address");
        address.innerHTML =
            `${member.address.street}<br>${member.address.city}
                ${member.address.state}, ${member.address.zip}`;
        
        // Phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        // Website
        const website = document.createElement("a");
        website.setAttribute("href", member.https);
        website.setAttribute("target", "_blank");
        website.textContent = member.website;

        // Add elements to address
        addTag.appendChild(address);
        addTag.appendChild(phone);
        addTag.appendChild(website);
        
        // Add address tag to the card
        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(addTag)

        // Add the card to the page
        cards.appendChild(card);
    });
}

// Display in list format
function displayList(members) {
    const row = document.querySelector(".directory");
    row.style.display = "flex";
    row.style.flexDirection = "column";

    // Create member info
    members.forEach(member => {
        
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
    });
}

// Load file
async function getMemberData() {
    
    // Get data from json file
    const response = await fetch(url);
    const data = await response.json();
    // Log data(jason file) to console in table format to the console
    console.table(data.members);

    // Default selection
    displayGrid(data.members);
    // displayList(data.members);
    
    // If user selects list view
    listView.addEventListener("click", () => {
        // Adjust aria attributes
        gridView.setAttribute("aria-pressed", "false");
        listView.setAttribute("aria-pressed", "true");

        // Erase all old data
        document.querySelector(".directory").innerHTML = "";

        // Replace with grid data
        displayList(data.members);
    });

    // If user selects grid view
    gridView.addEventListener("click", () => {
        // Adjust aria attributes
        gridView.setAttribute("aria-pressed", "true");
        listView.setAttribute("aria-pressed", "false");

        // Erase all old data
        document.querySelector(".directory").innerHTML = "";

        // Replace with grid data
        displayGrid(data.members);
    });
}
