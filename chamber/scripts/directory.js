// Membership data
const jsonData = 'data/members.json' // File path
// Layout buttons
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const layout = document.querySelector("#directory");




gridButton.addEventListener("click", showGrid);
listButton.addEventListener("click", showList);


//add list class and remove grid class
function showList() {
  layout.classList.add("directory-list");
  layout.classList.remove("directory-grid");
}

//add grid class and remove list class
function showGrid() {
  layout.classList.add("directory-grid");
  layout.classList.remove("directory-list");
}

// async function for fetching membership data
async function fetchMemberData() {
  // Load/fetch data json file using json url path
  const response = await fetch(jsonData);

  // Store the data
  const data = await response.json();

  // Log data(jason file) to console in table format to the console
  console.table(data.members);
  displayData(data.members)
}

// For each card display info from data loaded
function displayData(members) {

  const cards = document.querySelectorAll('.card');
  
  members.forEach((member, index) => {

    const card = cards[index];

    // Set business name
    const businessName = card.querySelector('.name');
    businessName.textContent = member.name

    // Set membership level
    const membership = card.querySelector('.membership');
    // Display star dependant on membership level
    let imageUrl = getImageUrl(member.membership);
    membership.setAttribute('src', imageUrl);
    membership.setAttribute('alt', `Membership level ${member.membership}`)

    // Set logo
    const logo = card.querySelector('.logo');
    logo.setAttribute('src', member.logo);
    logo.setAttribute('alt', `Logo for ${member.name}`);

    // Set description
    const description = card.querySelector('.desc');
    description.textContent = member.description;

    // Set address
    const street = card.querySelector('.street');
    const businessLocation = card.querySelector('.location');
    street.textContent = member.address.street;
    let loc = `${member.address.city} ${member.address.state} ${member.address.zip}`;
    businessLocation.textContent = loc;

    // Set phone number
    const phone = card.querySelector('.phone');
    phone.textContent = member.phone;

    // Set website URL
    const website = card.querySelector('.url');
    let url = member.url;
    let displayUrl = url.replace("https://", "");
    website.setAttribute('href', url);
    website.textContent = displayUrl;

  });// End foreach
}// End DisplayData function
  
  
  
 
  
  
  
  


  

// Gets image url location for membership stars
function getImageUrl(membership) {
  let imageUrl = "";
  if (membership === 1) {
    imageUrl = 'images/membership/gold-star.svg';
  }
  else if (membership === 2) {
    imageUrl = 'images/membership/silver-star.svg';
  }
  else if (membership === 3) {
    imageUrl = 'images/membership/bronze-star.svg';
  }
  else imageUrl = "";

  return imageUrl;
}


fetchMemberData();