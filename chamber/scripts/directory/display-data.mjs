// Membership data
const jsonData = 'data/members.json' // File path

// Get an Array of members
export async function getMembers() {
  const response = await fetch(jsonData);
  const data = await response.json();
  // Log data(jason file) to console in table format to the console
  // console.table(data.members);
  return data.members;
}

// For each card display info from data loaded
export function displayData(members, query) {

  const isListView = document.querySelector("#directory")?.classList.contains("directory-list");

  // For each card assign member data to each card according to index number
  members.forEach((member, index) => {

    const card = query[index];
    // skip if there’s no matching card
    if (!card) return;
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
    const largeImage = member.large;
    const smallImage = member.small;
    let revisedUrl;
    let size;

    if (isListView) {
      revisedUrl = smallImage;
      size = "Small"
      console.log('revisedUrl:', revisedUrl);
      logo.setAttribute("width", "80");
      logo.setAttribute("height", "80");
    } else {
      size = "Large";
      revisedUrl = largeImage;
      console.log('revisedUrl:', revisedUrl);
      logo.setAttribute("width", "280");
      logo.setAttribute("height", "280");
    } // End if

    logo.setAttribute('src', revisedUrl);
    logo.setAttribute('alt', `${size} logo for ${member.name}`);
    logo.setAttribute('title',`${member.name} - ${size}`);
      

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
  };// End DisplayData function

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