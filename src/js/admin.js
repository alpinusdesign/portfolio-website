const url = "http://localhost/projekt/index.php";

/* ============= */
/* = Bindings = */
/* ============= */

/* - Dataset selector - */
// Used to choose between different datasets.
const selectorEl = document.getElementById("admin-selector");

/* - Message area  - */
// Used to display success- and error messages.
const messageAreaEl = document.getElementById("admin-message-area");

    /* - Form containers - */
    // Used to access the containers that hold the different dataset-forms.
    const formContainers = {
        project = document.getElementById("project-form-cont"),
        occupation = document.getElementById("occupation-form-cont"),
        education = document.getElementById("education-form-cont")
    }


/* - Form navigation buttons - */
// Used to switch between the different CRUD-options.
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

/* - Education forms - */
// Used to access inputs and of the education-dataset.
const educationForms = {
    createFormEl = document.getElementById("education-form-create"),
    updateFormEl = document.getElementById("education-form-update"),
    deleteFormEl = document.getElementById("education-form-delete"),

    /* - Create - */
    createForm = {
        nameEl = document.getElementById("education-create-name"),
        schoolEl = document.getElementById("education-create-school"),
        typeEl = document.getElementById("education-create-type"),
        startEl = document.getElementById("education-create-start"),
        endEl = document.getElementById("education-create-end")
    },

    /* - Update - */
    updateForm = {
        nameOldEl = document.getElementById("education-update-name-old"),
        nameEl = document.getElementById("education-update-name"),
        schoolEl = document.getElementById("education-update-school"),
        typeEl = document.getElementById("education-update-type"),
        startEl = document.getElementById("education-update-start"),
        endEl = document.getElementById("education-update-end")
    },

    /* - Delete - */
    deleteForm = {
        nameEl = document.getElementById("education-delete-name")
    }
};

/* - Occupation forms - */
// Used to access inputs and of the occupation-dataset.
const occupationForms = {
    createFormEl = document.getElementById("occupation-form-create"),
    updateFormEl = document.getElementById("occupation-form-update"),
    deleteFormEl = document.getElementById("occupation-form-delete"),

    /* - Create - */
    createForm = {
        companyEl = document.getElementById("occupation-create-company"),
        titleEl = document.getElementById("occupation-create-title"),
        startEl = document.getElementById("occupation-create-start"),
        endEl = document.getElementById("occupation-create-end")
    },

    /* - Update - */
    updateForm = {
        oldEntryEl = document.getElementById("occupation-update-entry"),
        companyEl = document.getElementById("occupation-update-company"),
        titleEl = document.getElementById("occupation-update-title"),
        startEl = document.getElementById("occupation-update-start"),
        endEl = document.getElementById("occupation-update-end")
    },

    /* - Delete - */
    deleteForm = {
        entryEl = document.getElementById("occupation-delete-entry")
    }
};





/* ============= */
/* = Functions = */
/* ============= */
/* - loadSelectBoxes - */
// Used to load data into various selectboxes.
function loadSelectBoxes(data) {
    
    /* - Project select-boxes - */
    // Clear select-boxes.
    projectForms.updateForm.titleOldEl.innerHTML = "";
    projectForms.deleteForm.titleEl.innerHTML = "";

    educationForms.updateForm.nameOldEl.innerHTML = "";
    educationForms.deleteForm.nameEl.innerHTML = "";
    educationForms.createForm.typeEl.innerHTML = "";
    educationForms.updateForm.typeEl.innerHTML = "";

    occupationForms.updateForm.oldEntryEl.innerHTML = "";
    occupationForms.deleteForm.entryEl.innerHTML = "";

    
    // Load new data.
    /* - Project select-boxes - */
    data.projects.forEach(datum => {
        projectForms.updateForm.titleOldEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Title + "</option>";
        projectForms.deleteForm.titleEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Title + "</option>";
    });

    /* - Education select-boxes - */
    data.educations.forEach(datum => {
        educationForms.updateForm.nameOldEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Name + "</option>";

        educationForms.deleteForm.nameEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Name + "</option>";
    });

    /* - Education type select-boxes - */
    data.educationTypes.forEach(datum => {
        educationForms.createForm.typeEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.ID + ' - ' + datum.Type + "</option>";

        educationForms.updateForm.typeEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.ID + ' - ' + datum.Type + "</option>";
    });

    /* - Occupation select-boxes - */
    data.occupations.forEach(datum => {
        occupationForms.updateForm.oldEntryEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Company + ', ' + datum.Title + "</option>";
        occupationForms.deleteForm.entryEl.innerHTML +=
        "<option value='" + datum.ID + "'>" + datum.Company + ', ' + datum.Title + "</option>";
    });
};





/* =================== */
/* = Event listeners = */
/* =================== */

/* = Form toggles = */
// Emphasizes the currently selected form-button, and reveals the related form.

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
        dataset: "projects",
        title: projectForms.createForm.titleEl.value,
        description: projectForms.createForm.descEl.value,
        url: projectForms.createForm.urlEl.value
      })
    })
    .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Project was successfully added.</p>"
            // Clear form.
            projectForms.createFormEl.reset();
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
        dataset: "projects",
        id: projectForms.updateForm.titleOldEl.value,
        title: projectForms.updateForm.titleEl.value,
        description: projectForms.updateForm.descEl.value,
        url: projectForms.updateForm.urlEl.value
        })
    })
        .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Project was successfully updated.</p>"
            // Clear form.
            projectForms.updateFormEl.reset();
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
    dataset: "projects",
    id: projectForms.deleteForm.titleEl.value
    })
})
    .then(function(response) {
    response.json().then(data => {
        loadSelectBoxes(data);
        messageAreaEl.innerHTML = "<p>Project was successfully deleted.</p>"
        // Clear form.
        projectForms.deleteFormEl.reset();
        
    });
})
    .catch(function(err) {
    console.log("Fatal error: ", err);
    });
});



/* = Occupations CRUD = */
// CRUD-interface for the occupations dataset.

/* - Create - */
occupationForms.createFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        dataset: "occupations",
        company: occupationForms.createForm.companyEl.value,
        title: occupationForms.createForm.titleEl.value,
        start: occupationForms.createForm.startEl.value,
        end: occupationForms.createForm.endEl.value
      })
    })
    .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Occupatino was successfully added.</p>"
            // Clear form.
            occupationForms.createFormEl.reset();
            
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
  });

/* - Update - */
occupationForms.updateFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.
    
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
        dataset: "occupations",
        id: occupationForms.updateForm.oldEntryEl.value,
        company: occupationForms.updateForm.companyEl.value,
        title: occupationForms.updateForm.titleEl.value,
        start: occupationForms.updateForm.startEl.value,
        end: occupationForms.updateForm.endEl.value
        })
    })
        .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Occupation was successfully updated.</p>"
            // Clear form.
            occupationForms.updateFormEl.reset();
        });
        })
        .catch(function(err) {
        console.log("Fatal error: ", err);
        });
    });
    
/* - Delete - */
occupationForms.deleteFormEl.addEventListener("submit", function(e) {
e.preventDefault(); // Prevent the form from being submited the default way.

fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
    dataset: "occupations",
    id: occupationForms.deleteForm.entryEl.value
    })
})
    .then(function(response) {
    response.json().then(data => {
        loadSelectBoxes(data);
        messageAreaEl.innerHTML = "<p>Occupation was successfully deleted.</p>"
        // Clear form.
        occupationForms.deleteFormEl.reset();
    });
})
    .catch(function(err) {
    console.log("Fatal error: ", err);
    });
});




/* = Educations CRUD = */
// CRUD-interface for the educations dataset.

/* - Create - */
educationForms.createFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        dataset: "educations",
        name: educationForms.createForm.nameEl.value,
        school: educationForms.createForm.schoolEl.value,
        start: educationForms.createForm.startEl.value,
        end: educationForms.createForm.endEl.value,
        typeID: educationForms.createForm.typeEl.value
      })
    })
    .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Education was successfully added.</p>"
            // Clear form.
            educationForms.createFormEl.reset();
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
  });

/* - Update - */
educationForms.updateFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.
    
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
        dataset: "educations",
        id: educationForms.updateForm.nameOldEl.value,
        name: educationForms.updateForm.nameEl.value,
        school: educationForms.updateForm.schoolEl.value,
        start: educationForms.updateForm.startEl.value,
        end: educationForms.updateForm.endEl.value,
        typeID: educationForms.updateForm.typeEl.value
        })
    })
        .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data);
            messageAreaEl.innerHTML = "<p>Education was successfully updated.</p>"
            // Clear form.
            educationForms.updateFormEl.reset();
        });
        })
        .catch(function(err) {
        console.log("Fatal error: ", err);
        });
    });
    
/* - Delete - */
educationForms.deleteFormEl.addEventListener("submit", function(e) {
e.preventDefault(); // Prevent the form from being submited the default way.

fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
    dataset: "educations",
    id: educationForms.deleteForm.nameEl.value
    })
})
    .then(function(response) {
    response.json().then(data => {
        loadSelectBoxes(data);
        messageAreaEl.innerHTML = "<p>Education was successfully deleted.</p>"
        // Clear form.
        educationForms.deleteFormEl.reset();
    });
})
    .catch(function(err) {
    console.log("Fatal error: ", err);
    });
});



// Load relevant database data when the DOM has been loaded.
document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
      .then(function(response) {
        response.json().then(data => {
            loadSelectBoxes(data); // Display courses on successfull fetch.
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
});

