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
    proyects.forEach(proyect => {
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
            handleRemoveProject(proyects, proyect);
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

    return header;
}   

function handleNewProject(allProyects) {
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
    const existingHeader = document.querySelector('header');
    if(existingHeader){
        existingHeader.remove();
        let newHeader = createHeader(allProyects, newProyect);
        document.body.prepend(newHeader);
    }
    onProjectChange(newProyect);
}

function actualizeHeader(header, proyects){
    let actualProyect = proyects[0];
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
    if(proyects.length != 0){
        proyects.forEach(proyect => {
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
                handleRemoveProject(proyects, proyect);
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
         handleNewProject(proyects);
     });
     projectDropdown.appendChild(newProjectButton);

    const existingDropdown = header.querySelector('.project-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    header.querySelector('.header-container').insertBefore(projectDropdown, header.querySelector('h1'));
}

function handleRemoveProject(allProyects, projectToRemove){
    let newAllProyects = allProyects.filter(project => project != projectToRemove);
    const existingHeader = document.querySelector('header');
    actualizeHeader(existingHeader, newAllProyects);
}


export { createHeader };

