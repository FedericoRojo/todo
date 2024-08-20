import {onProjectChange, onCalendarChange, savedProjects, saveProjects, loadProjects} from "./index.js";
import Proyect from "./Proyect";
import {createCalendar} from "./calendarPage.js"

function createHeader(actualProyect) {
    // Create the header element
    const header = document.createElement('header');

    // Create the header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    // Create the project dropdown div
    const projectDropdown = document.createElement('div');
    projectDropdown.className = 'project-dropdown';

    const dropdownButton = document.createElement('button');
    dropdownButton.className = 'dropdown-button';
    projectDropdown.appendChild(dropdownButton);
    // Create the dropdown button
    if(actualProyect != null){
        dropdownButton.textContent = actualProyect.title;    
    }else{
        dropdownButton.textContent = "Calendar";
        onCalendarChange();
    }
   
    // Create the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    projectDropdown.appendChild(dropdownMenu);

    const dropdownItem = document.createElement('div');
    dropdownItem.className = 'dropdown-item';

    const projectLabel = document.createElement('span');
    projectLabel.textContent = "Calendar";
    dropdownItem.appendChild(projectLabel);

    dropdownItem.addEventListener('click', () => {
        onCalendarChange();
        actualProyect = 'Calendar';
        dropdownButton.textContent = 'Calendar'; // Update the button text
    });

    dropdownMenu.appendChild(dropdownItem);

    // Populate the dropdown with project options
    if(savedProjects.length != 0){
        savedProjects.forEach(proyect => {
            const dropdownItem = document.createElement('div');
            dropdownItem.className = 'dropdown-item';
    
            const projectLabel = document.createElement('span');
            projectLabel.textContent = proyect.title;
            dropdownItem.appendChild(projectLabel);
    
            // Create the remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
                handleRemoveProject(proyect);
            });
            dropdownItem.appendChild(removeButton);
    
            // Add event listener to handle project selection
            dropdownItem.addEventListener('click', () => {
                onProjectChange(proyect);
                actualProyect = proyect;
                dropdownButton.textContent = proyect.title; // Update the button text
            });
    
            dropdownMenu.appendChild(dropdownItem);
        });
    }
    

    // Create the "Create Project" button
    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = 'New Project';
    newProjectButton.className = 'new-project-button';
    newProjectButton.addEventListener('click', () => {
        handleNewProject();
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

    return header;
}   


function handleNewProject() {
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
            createProject(title);
            document.body.removeChild(modalBackground); // Remove the modal from the DOM
        }
    });

    // Event listener for the close button
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalBackground); // Remove the modal from the DOM
    });
}

function createProject(title) {
    let newProyect = new Proyect(title);
    savedProjects.push(newProyect);
    saveProjects();
    const existingHeader = document.querySelector('header');
    if(existingHeader){
        existingHeader.remove();
        let newHeader = createHeader(newProyect);
        document.body.prepend(newHeader);
    }
    onProjectChange(newProyect);
}

function actualiceHeader(header){
    let actualProyect = savedProjects[0];
    
    // Create the project dropdown div
    const projectDropdown = document.createElement('div');
    projectDropdown.className = 'project-dropdown';

    // Create the dropdown button
    const dropdownButton = document.createElement('button');
    dropdownButton.textContent = actualProyect.title;
    dropdownButton.className = 'dropdown-button';
    projectDropdown.appendChild(dropdownButton);

    // Create the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    projectDropdown.appendChild(dropdownMenu);

    // Populate the dropdown with project options
    if(savedProjects.length != 0){
        savedProjects.forEach(proyect => {
            const dropdownItem = document.createElement('div');
            dropdownItem.className = 'dropdown-item';
    
            const projectLabel = document.createElement('span');
            projectLabel.textContent = proyect.title;
            dropdownItem.appendChild(projectLabel);
    
            // Create the remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
                handleRemoveProject(proyect);
            });
            dropdownItem.appendChild(removeButton);
    
            // Add event listener to handle project selection
            dropdownItem.addEventListener('click', () => {
                if (proyect !== actualProyect) {
                    onProjectChange(proyect);
                    actualProyect = proyect;
                    dropdownButton.textContent = proyect.title; // Update the button text
                }
            });
    
            dropdownMenu.appendChild(dropdownItem);
        });
    }
    

     // Create the "Create Project" button
     const newProjectButton = document.createElement('button');
     newProjectButton.textContent = 'New Project';
     newProjectButton.className = 'new-project-button';
     newProjectButton.addEventListener('click', () => {
         handleNewProject();
     });
     projectDropdown.appendChild(newProjectButton);

    const existingDropdown = header.querySelector('.project-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    header.querySelector('.header-container').insertBefore(projectDropdown, header.querySelector('h1'));
}

function handleRemoveProject(projectToRemove){
    savedProjects.filter(project => project != projectToRemove);
    saveProjects();
    const existingHeader = document.querySelector('header');
    if(savedProjects.length != 0){
        actualiceHeader(existingHeader);
    }else{
        createCalendar();
    }
    
}


export { createHeader };

