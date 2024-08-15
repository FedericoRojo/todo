import {onProjectChange} from "./index.js";
import Proyect from "./Proyect";

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
    


    // Create the "Create Project" button
    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = 'New Project';
    newProjectButton.className = 'new-project-button';
    newProjectButton.addEventListener('click', () => {
        handleNewProject(proyects);
    });

    projectDropdown.appendChild(newProjectButton);
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

function handleNewProject(allProyects){
    createProjectModal(allProyects);
    //let newProyect = new Proyect();
}

function createProjectModal(allProyects) {
    // Create the modal background
    const modalBackground = document.createElement('div');
    modalBackground.className = 'modal-background';

    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Create the close button ("X")
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';
    modalContainer.appendChild(closeButton);

    // Create the input field for the project title
    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.placeholder = 'Enter project title';
    modalContainer.appendChild(projectInput);

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Create Project';
    modalContainer.appendChild(submitButton);

    // Append the modal container to the background
    modalBackground.appendChild(modalContainer);

    // Append the modal background to the document body
    document.body.appendChild(modalBackground);

    // Event listener for the submit button
    submitButton.addEventListener('click', () => {
        const title = projectInput.value.trim();
        if (title) {
            createProject(title, allProyects);
            document.body.removeChild(modalBackground); // Remove the modal from the DOM
        }
    });

    // Event listener for the close button
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalBackground); // Remove the modal from the DOM
    });
}

function createProject(title, allProyects) {
    let newProyect = new Proyect(title);
    allProyects.push(newProyect);
    onProjectChange(newProyect);
    const existingHeader = document.querySelector('header');
    if(existingHeader){
        existingHeader.remove();
        let newHeader = createHeader(allProyects, newProyect);
        document.body.prepend(newHeader);
    }
    
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