"use strict";

/* ============= */
/* = Bindings = */
/* ============= */

/* - API-URL - */
const url = "http://localhost/projekt/index.php";

/* - Experience navigation buttons - */
const experienceToggles = {
    "toggleOccupationEl": document.getElementById("experience-nav-occupation"),
    "toggleEducationEl": document.getElementById("experience-nav-education")
};

const experienceAreas = {
    "occupationAreaEl": document.getElementById("occupation-area"),
    "educationAreaEl": document.getElementById("education-area")
};


/* - Portfolio-related elements - */
const portfolioAreaEl = document.getElementById("portfolio-area");

/* - Hamburger menu-related elements - */
const hamburgerButtonEl = document.getElementById("hamburger-bttn");
const hamburgerMenuEl = document.getElementById("hamburger-menu");

/* ============= */
/* = Functions = */
/* ============= */

// Prints the data fetched from the REST-API.
function printData(data)
{
    /* - Educations - */
    data.educations.forEach(education =>{
        // If the end date is set, print it. Otherwise, inform that it is ongoing.
        if(education.EndDate !== "0000-00-00"){
            experienceAreas.educationAreaEl.innerHTML += `<div class="experience-entry"><span class="education-name">${education.Name}</span><span class="education-school">${education.School}</span><span class="education-type">${education.Type}</span><span class="education-duration">${education.StartDate} - ${education.EndDate}</span></div>`;
        }
        else
        {
            experienceAreas.educationAreaEl.innerHTML += `<div class="experience-entry"><span class="education-name">${education.Name}</span><span class="education-school">${education.School}</span><span class="education-type">${education.Type}</span><span class="education-duration">${education.StartDate} - Ongoing</span></div>`;
        }
    });

    /* - Occupations - */
    data.occupations.forEach(occupation =>{
        // If the end date is set, print it. Otherwise, inform that it is ongoing.
        if(occupation.EndDate !== "0000-00-00"){
            experienceAreas.occupationAreaEl.innerHTML += `<div class="experience-entry"><span class="occupation-title">${occupation.Title}</span><span class="occupation-company">${occupation.Company}</span><span class="occupation-duration">${occupation.StartDate} - ${occupation.EndDate}</span></div>`;
        }
        else
        {
            experienceAreas.occupationAreaEl.innerHTML += `<div class="experience-entry"><span class="occupation-title">${occupation.Title}</span><span class="occupation-company">${occupation.Company}</span><span class="occupation-duration">${occupation.StartDate} - Ongoing</span></div>`;
        }
    });

    /* - Projects - */
    data.projects.forEach(project =>{
        portfolioAreaEl.innerHTML += `<div class="portfolio-entry"><span class="portfolio-title">${project.Title}</span><p class="portfolio-description">${project.Description}</p><a class="portfolio-link" href="${project.URL}" target="_blank">Visit Website</a></div>`;
    });
}


/* =================== */
/* = Event listeners = */
/* =================== */

/* = Form toggles = */
// Emphasizes the currently selected form-button, and reveals the related form.
/* - Toggle Occupation - */
experienceToggles.toggleOccupationEl.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    experienceToggles.toggleEducationEl.classList.remove("active");

    experienceAreas.occupationAreaEl.classList.add("active");
    experienceAreas.educationAreaEl.classList.remove("active");
});

/* - Toggle Education - */
experienceToggles.toggleEducationEl.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    experienceToggles.toggleOccupationEl.classList.remove("active");

    experienceAreas.educationAreaEl.classList.add("active");
    experienceAreas.occupationAreaEl.classList.remove("active");
});



/* - Hamburger button - */
// Toggles the hamburger menu.
hamburgerButtonEl.addEventListener("click", function(){
    hamburgerMenuEl.classList.toggle("active");
});



/* - Data loader - */
// Load relevant database data when the DOM has been loaded.
document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
      .then(function(response) {
        response.json().then(data => {
            printData(data); // Display experiences and projects.
        });
      })
      .catch(function(err) {
        messageAreaEl.innerHTML = "<p class='error'>Fatal error: " + err + "</p>";
      });
});