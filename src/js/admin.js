const url = "http://localhost/projekt/index.php";

/* ============= */
/* = Bindings = */
/* ============= */

/* - Dataset selector - */
// Used to choose between different datasets.
const selectorEl = document.getElementById("admin-selector");

    /* - Form containers - */
    const formContainers = {
        project = document.getElementById("project-form-cont"),
        occupation = document.getElementById("occupation-form-cont"),
        education = document.getElementById("education-form-cont")
    }


/* - Form navigation buttons - */
// Used to toggle between the different CRUD-options.
const formToggles = {
    toggleCreate = document.getElementById("toggle-create"),
    toggleUpdate = document.getElementById("toggle-update"),
    toggleDelete = document.getElementById("toggle-delete")
}

    /* - Forms lists - */
    // Used to toggle all forms of a specific type.
    const createForms = document.getElementsByClassName("form-create");
    const updateForms = document.getElementsByClassName("form-update");
    const deleteForms = document.getElementsByClassName("form-delete");


/* - Project forms - */
// Used to access inputs and of the project-dataset.
/* - Project forms - */
const projectForms = {
    createFormEl = document.getElementById("project-form-create"),
    updateFormEl = document.getElementById("project-form-update"),
    deleteFormEl = document.getElementById("project-form-delete"),

    /* - Create - */
    createForm = {
        titleEl = document.getElementById("project-create-title"),
        descEl = document.getElementById("project-create-description"),
        urlEl = document.getElementById("project-create-url")
    },

    /* - Update - */
    updateForm = {
        titleOldEl = document.getElementById("project-update-title-old"),
        titleEl = document.getElementById("project-update-title-new"),
        descEl = document.getElementById("project-update-description"),
        urlEl = document.getElementById("project-update-url")
    },

    /* - Delete - */
    deleteForm = {
        titleEl = document.getElementById("project-delete-title")
    }
};





/* ============= */
/* = Functions = */
/* ============= */
/* - loadTitles - */
// Used to load object titles into the select-boxes. 
function loadTitles(projects) {
    projectForms.updateForm.titleOldEl.innerHTML = "";
    projectForms.deleteForm.titleEl.innerHTML = "";

    projects.forEach(project => {
    /* - Project select-boxes - */
    projectForms.updateForm.titleOldEl.innerHTML +=
    "<option value='" + project.ID + "'>" + project.ID + ' - ' + project.Title + "</option>";
    projectForms.deleteForm.titleEl.innerHTML +=
    "<option value='" + project.ID + "'>" + project.ID + ' - ' + project.Title + "</option>";
      });
};





/* =================== */
/* = Event listeners = */
/* =================== */

/* = Form navigation toggles = */
// Emphasizes the currently selected navigation-element, and reveals the related form.

/* - Toggle Create - */
formToggles.toggleCreate.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    formToggles.toggleUpdate.classList.remove("active");
    formToggles.toggleDelete.classList.remove("active");
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

/* - Toggle Update - */
formToggles.toggleUpdate.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    formToggles.toggleCreate.classList.remove("active");
    formToggles.toggleDelete.classList.remove("active");
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

/* - Toggle Delete - */
formToggles.toggleDelete.addEventListener("click", function(e) {
    // Show which toggle is currently active.
    e.target.classList.add("active");
    formToggles.toggleUpdate.classList.remove("active");
    formToggles.toggleCreate.classList.remove("active");
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



/* = Dataset toggle = */
// Reveals the interface of a specific dataset.
selectorEl.addEventListener("change", function(e) {
    switch(selectorEl.options[selectorEl.selectedIndex].value)
    {
        /* - Project - */
        case "project":
            formContainers.project.classList.add("active");
            formContainers.education.classList.remove("active");
            formContainers.occupation.classList.remove("active");
        break;

        /* - Education - */
        case "education":
            formContainers.education.classList.add("active");
            formContainers.project.classList.remove("active");
            formContainers.occupation.classList.remove("active");
        break;

        /* - Occupation - */
        case "occupation":        
        formContainers.occupation.classList.add("active");
        formContainers.education.classList.remove("active");
        formContainers.project.classList.remove("active");
        break;
    }

});


/* = Project CRUD = */
// CRUD-interface for the project dataset.
/* - Create - */
projectForms.createFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: projectForms.createForm.titleEl.value,
        description: projectForms.createForm.descEl.value,
        url: projectForms.createForm.urlEl.value
      })
    })
    .then(function(response) {
        response.json().then(data => {
            loadTitles(data);
            console.log("Project successfully added.");
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
  });

/* - Delete - */
projectForms.deleteFormEl.addEventListener("submit", function(e) {
e.preventDefault(); // Prevent the form from being submited the default way.

fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
    id: projectForms.deleteForm.titleEl.value
    })
})
    .then(function(response) {
    response.json().then(data => {
        loadTitles(data);
        console.log("Project successfully removed.");
    });
})
    .catch(function(err) {
    console.log("Fatal error: ", err);
    });
});

/* - Update - */
projectForms.updateFormEl.addEventListener("submit", function(e) {
e.preventDefault(); // Prevent the form from being submited the default way.

fetch(url, {
    method: "PUT",
    body: JSON.stringify({
    id: projectForms.updateForm.titleOldEl.value,
    title: projectForms.updateForm.titleEl.value,
    description: projectForms.updateForm.descEl.value,
    url: projectForms.updateForm.urlEl.value
    })
})
    .then(function(response) {
    response.json().then(data => {
        loadTitles(data);
        console.log("Project successfully added.");
    });
    })
    .catch(function(err) {
    console.log("Fatal error: ", err);
    });
});








document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
      .then(function(response) {
        response.json().then(data => {
            loadTitles(data); // Display courses on successfull fetch.
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
});

