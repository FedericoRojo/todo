import {onProjectChange} from "./index.js";

function createHeader(proyects, actualProyect) {
    // Create the header element
    const header = document.createElement('header');

    // Create the header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    // Create the project dropdown div
    const projectDropdown = document.createElement('div');
    projectDropdown.className = 'project-dropdown';

    // Option to choose from available projects
    const projectSelect = document.createElement('select');
    projectSelect.className = 'task-select';

    // Populate the dropdown with project options
    proyects.forEach(proyect => {
        const option = document.createElement('option');
        option.value = proyect.title; // Use the project title as the value
        option.textContent = proyect.title; // Display the project title
        if (proyect.title === actualProyect.title) {
            option.selected = true; // Set the default selected option
        }
        projectSelect.appendChild(option);
    });

    projectDropdown.appendChild(projectSelect);
    headerContainer.appendChild(projectDropdown);

    // Create the app title
    const appTitle = document.createElement('h1');
    appTitle.className = 'app-title';
    appTitle.textContent = 'TO-DO';
    headerContainer.appendChild(appTitle);

    // Append the header container to the header element
    header.appendChild(headerContainer);

    // Add event listener for project selection changes
    projectSelect.addEventListener('change', (event) => {
        const selectedProjectTitle = event.target.value;
        const selectedProject = proyects.find(proyect => proyect.title === selectedProjectTitle);
        if (selectedProject != actualProyect) {
            onProjectChange(selectedProject);
            actualProyect = selectedProject;
            selectedProject.textContent = selectedProject.title;
        } 
    }); 

    return header;
}



export { createHeader };


/*
<header>
        <div class="header-container">
            <div class="project-selection">
                <div class="selected-project">
                    Proyecto
                </div>
                <div class="project-dropdown">
                </div>
            </div>
            <h1 class="app-title">TO-DO</h1>
        </div>
</header>
*/