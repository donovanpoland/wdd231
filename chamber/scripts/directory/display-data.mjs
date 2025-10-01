// Membership data
const jsonData = 'data/members.json' // File path

// Async function for fetching membership data
export async function fetchMemberData() {
    // Load/fetch data json file using json url path
    const response = await fetch(jsonData);

    // Store the data
    const data = await response.json();

    // Log data(jason file) to console in table format to the console
    // console.table(data.members);
    displayData(data.members);
}

// Get an Array of members
export async function getMembers() {
  const res = await fetch(jsonData);
  const data = await res.json();
  return data.members;
}


// For each card display info from data loaded
function displayData(members) {

    // Find all classes with the name card and place them in an array
    const cards = document.querySelectorAll('.directory-grid .card');
  
    // For each card assign member data to each card according to index number
    members.forEach((member, index) => {

        const card = cards[index];
        if (!card) return;  // skip if there’s no matching card
        // Set business name
        const businessName = card.querySelector('.business-name')
        businessName.textContent = member.name;

        // Set membership level
        const membership = card.querySelector('.membership');
        // Display star dependant on membership level
        let imageUrl = getImageUrl(member.membership);
        membership.setAttribute('src', imageUrl);
        membership.setAttribute('alt', `Membership level ${member.membership}`);

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
        const website = card.querySelector('.contact a');
        let url = member.url;
        let displayUrl = url.replace("https://", "");
        website.setAttribute('href', url);
        website.textContent = displayUrl;
  });// End foreach
}// End DisplayData function

// Get Random highlighted members to display
export async function chooseHighlights(count = 4) {
  const members = await getMembers();
  const picks = pickRandom(members, count);
  displayData(picks);
}


function pickRandom(arr, count) {
  const copy = [...arr];
  copy.sort(() => 0.5 - Math.random());
  return copy.slice(0, count);
}


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