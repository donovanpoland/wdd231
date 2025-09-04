createFooterInfo();

// get the current year and the last date/time the page was modified
function getYearAndLastModified() {
  const currentYear = document.querySelector("#current-year");
  const lastMod = document.querySelector("#last-modified");

  const today = new Date();
  const lastModDate = new Date(document.lastModified);

  //check current year id is found on page
  if (currentYear) {
    //display the info
    currentYear.innerHTML = "&copy; " + today.getFullYear() + " Donovan Poland<br>Salt Lake City, Utah";
  }

  //check if last modified id is found the page
  if (lastMod) {
    // Format date to MM/DD/YYYY HH:MM:SS (local)
    const localFormatted = lastModDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // UTC time
    const utcFormatted = lastModDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    //Add GMT offset
    const offsetMinutes = today.getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const formattedOffset = `MT${offsetHours >= 0 ? "+" : ""}${offsetHours}`;

    //display the info
    lastMod.innerHTML =
      `Last modified:<br>${localFormatted} ${formattedOffset}<br>${utcFormatted} UTC`;
  }
}

function createFooterInfo() {
  //get footer tag
  const footer = document.querySelector("footer");

  //create container
  const container = document.createElement("section");
  //update this class in CSS to page specifications
  container.classList.add("modified");

  //create paragraph with id current year
  const paragraph1 = document.createElement("p");
  paragraph1.setAttribute("id", "current-year");

  //create paragraph with id last modified
  const paragraph2 = document.createElement("p");
  paragraph2.setAttribute("id", "last-modified");

  //add to page
  container.appendChild(paragraph1);
  container.appendChild(paragraph2);
  footer.appendChild(container);
  getYearAndLastModified();
}
