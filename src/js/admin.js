/* - Variables - */


const selectorEl = document.getElementById("admin-selector");

/* - Form navigation buttons - */
const toggleCreateEl = document.getElementById("toggle-create");
const toggleUpdateEl = document.getElementById("toggle-update");
const toggleDeleteEl = document.getElementById("toggle-delete");

/* - Form containers - */
const projectFormCont = document.getElementById("project-form-cont");
const occupationFormsCont = document.getElementById("occupation-form-cont");
const educationFormsCont = document.getElementById("education-form-cont");

/* - Forms - */
const createForms = document.getElementsByClassName("form-create");
const updateForms = document.getElementsByClassName("form-update");
const deleteForms = document.getElementsByClassName("form-delete");

/* - Functions - */

/* - Event listeners - */

/* = Form navigation toggles = */
// Emphasizes the currently selected navigation-element, and reveals the related form.
toggleCreateEl.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    toggleUpdateEl.classList.remove("active");
    toggleDeleteEl.classList.remove("active");
    // Show which form is currently active and hide others.
    for(let i = 0; i < createForms.length; i++)
    {
        createForms[i].classList.add("active");
    }
    for(let i = 0; i < updateForms.length; i++)
    {
        updateForms[i].classList.remove("active");
    }
    for(let i = 0; i < deleteForms.length; i++)
    {
        deleteForms[i].classList.remove("active");
    }
});
  
toggleUpdateEl.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    toggleCreateEl.classList.remove("active");
    toggleDeleteEl.classList.remove("active");
    // Show which form is currently active and hide others.
    for(let i = 0; i < updateForms.length; i++)
    {
        updateForms[i].classList.add("active");
    }
    for(let i = 0; i < createForms.length; i++)
    {
        createForms[i].classList.remove("active");
    }
    for(let i = 0; i < deleteForms.length; i++)
    {
        deleteForms[i].classList.remove("active");
    }
    
});

toggleDeleteEl.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    toggleCreateEl.classList.remove("active");
    toggleUpdateEl.classList.remove("active");
    // Show which form is currently active and hide others.
    for(let i = 0; i < deleteForms.length; i++)
    {
        deleteForms[i].classList.add("active");
    }
    for(let i = 0; i < updateForms.length; i++)
    {
        createForms[i].classList.remove("active");
    }
    for(let i = 0; i < createForms.length; i++)
    {
        updateForms[i].classList.remove("active");
    }
});



selectorEl.addEventListener("change", function(e) {
    switch(selectorEl.options[selectorEl.selectedIndex].value)
    {
        case "project":
            projectFormCont.classList.add("active");
            educationFormsCont.classList.remove("active");
            occupationFormsCont.classList.remove("active");
        break;

        case "education":
            educationFormsCont.classList.add("active");
            projectFormCont.classList.remove("active");
            occupationFormsCont.classList.remove("active");
        break;

        case "occupation":        
        occupationFormsCont.classList.add("active");
        educationFormsCont.classList.remove("active");
        projectFormCont.classList.remove("active");
        break;
    }

});