createFooterInfo();



// get the current year and the last date/time the page was modified
function getYearAndLastModified() {
  const currentYear = document.querySelector("#current-year");
  const lastModified = document.querySelector("#last-modified");

  const today = new Date();
  const lastMod = new Date(document.lastModified);

  //check current year id is found on page
  if (currentYear) {
    //display the info
    currentYear.innerHTML = "&copy; " + today.getFullYear() + " Donovan Poland - Salt Lake City, Utah";
  }

  //check if last modified id is found the page
  if (lastModified) {
    // Format date to MM/DD/YYYY HH:MM:SS (local)
    const localFormatted = lastMod.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // UTC time
    const utcFormatted = lastMod.toLocaleString("en-US", {
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
    const formattedOffset = `GMT${offsetHours >= 0 ? "+" : ""}${offsetHours}`;

    //display the info
    lastModified.innerHTML =
      `Last modified: ${localFormatted} ${formattedOffset}<br>` +
      `Last modified: ${utcFormatted} UTC`;
  }
}

function createFooterInfo() {

  //get footer tag
  const footer = document.querySelector("footer");
  footer.style.textAlign = "center";
  //create paragraph with id current year
  const pCurentYear = document.createElement("p")
  pCurentYear.setAttribute("id", "current-year")


  //create paragraph with id last modified
  const pLastModified = document.createElement("p");
  pLastModified.setAttribute("id", "last-modified");


  //add to page
  footer.appendChild(pCurentYear)
  footer.appendChild(pLastModified)
  getYearAndLastModified();
}
