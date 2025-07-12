
// name url data from json file name
const url = `data/members.json`;
// Find directory insertion class in html
const cards = document.querySelector(".directory");
const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");


// Load file
async function getMemberData() {
    
    // Get data from json file
    const response = await fetch(url);
    const data = await response.json();
    // Log data(jason file) to console in table format to the console
    console.table(data.members);

    // Default selection
    displayGrid(data.members);

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

getMemberData();

function displayGrid(members) {
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
        const name = document.createElement("h3");
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


function displayList(members) {
    members.forEach(member => {
        const cards = document.querySelector(".directory");
        cards.style.display = "flex"
        // Create a new card
        const card = document.createElement("section")
        card.classList.add("card");
        card.style.flexDirection = "row";

        const items = [
            member.name,
            `${member.address.street}<br>${member.address.city}
                ${member.address.state}, ${member.address.zip}`,
            member.phone,
            member.website
        ];

        const list = document.createElement("ul");

        items.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = item;
            list.appendChild(listItem);
        });
        
        // Add to card
        card.appendChild(list);

        // Add to page
        cards.appendChild(card);
    });
}

