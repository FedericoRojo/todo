import Task from "./task";
import {onProjectChange, savedProjects, saveProjects} from "./index.js";
import {format, formatDate} from "date-fns"

let taskButtonClicked = false;

function createTaskCard(task) {
    // Create the task card
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    // Create the task card text
    const taskCardText = document.createElement('div');
    taskCardText.className = 'task-card-text';
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    const taskDescription = document.createElement('div');
    taskDescription.textContent = task.description;

    // Append title and description to taskCardText
    taskCardText.appendChild(taskTitle);
    taskCardText.appendChild(taskDescription);

    // Create the task card options
    const taskCardOptions = document.createElement('div');
    taskCardOptions.className = 'task-card-options';
    
    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Borrar';
    deleteOption.addEventListener('click', () => {
        handleDelete(task, taskCard);
    });

    const editOption = document.createElement('div');
    editOption.textContent = 'Editar';
    editOption.addEventListener('click', () => {
        handleTaskModify(task, taskCard);
    });
    
    // Create the date tag
    const dateTag = document.createElement('div');
    dateTag.textContent = format(task.date, 'dd/MM/yyyy');

    const priorityOption = document.createElement('div');
    priorityOption.textContent = task.prior;
    
    // Append options to taskCardOptions
    taskCardOptions.appendChild(deleteOption);
    taskCardOptions.appendChild(editOption);
    taskCardOptions.appendChild(priorityOption);
    taskCardOptions.appendChild(dateTag);

    // Append taskCardText and taskCardOptions to taskCard
    taskCard.appendChild(taskCardText);
    taskCard.appendChild(taskCardOptions);

    return taskCard;
}

function createTaskContainer(proyect) {
    let taskContainer;
    if(proyect != null){
        let tasks = proyect.taskList;
        // Create the main task container
        taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';
    
        const emptyDiv1 = document.createElement('div');
        const emptyDiv2 = document.createElement('div');
        // Create the inner container
        const innerContainer = document.createElement('div');
    
        // Create the new task button
        const newTaskButton = document.createElement('div');
        newTaskButton.className = 'new-task-button';
        newTaskButton.textContent = 'New Task';
        newTaskButton.addEventListener('click', () => {
            if( taskButtonClicked == false ){
                taskButtonClicked = true;
                const taskCard = createEditableTaskCard(proyect);
                newTaskButton.parentNode.insertBefore(taskCard, newTaskButton.nextSibling);
            }
        });
    
        // Append the new task button to the inner container
        innerContainer.appendChild(newTaskButton);
    
        // Create and add each task card to the inner container
        if(tasks.length != 0){
            tasks.forEach(task => {
                const taskCard = createTaskCard(task);
                innerContainer.appendChild(taskCard);
            });
        }
        
    
        // Append the inner container to the task container
        taskContainer.appendChild(emptyDiv1);
        taskContainer.appendChild(innerContainer);
        taskContainer.appendChild(emptyDiv2);
        
        return taskContainer;
    } 
}

function createEditableTaskCard(proyect) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    const taskCardText = document.createElement('div');
    taskCardText.className = 'task-card-text';

    // Create editable elements that visually match <h3> and <div>
    const titleElement = document.createElement('h3');
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Enter title';
    titleInput.className = "task-input";
    titleElement.appendChild(titleInput);

    const descriptionElement = document.createElement('div');
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Enter description';
    descriptionInput.className = "task-textarea";
    descriptionElement.appendChild(descriptionInput);

    // Append the editable elements to the task card text container
    taskCardText.appendChild(titleElement);
    taskCardText.appendChild(descriptionElement);

    // Append inputs to task card text container
    taskCardText.appendChild(titleInput);
    taskCardText.appendChild(descriptionInput);

    const taskCardOptions = document.createElement('div');
    taskCardOptions.className = 'task-card-options';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'myDateInput';
    dateInput.className = "custom-date-input";

    // Add an event listener to handle the selected date
    let selectedDate;
    dateInput.addEventListener('change', () => {
        const dateString = dateInput.value;
        const [year, month, day] = dateString.split('-');
        selectedDate = new Date(year, month - 1, day, 12, 0, 0);
    });

     // Option to choose priority
     const prioritySelect = document.createElement('select');
     prioritySelect.className = "task-select";
     const priorities = ['1', '2', '3'];
     priorities.forEach(priority => {
         const option = document.createElement('option');
         option.value = priority;
         option.textContent = `Priority ${priority}`;
         prioritySelect.appendChild(option);
     });
 
     taskCardOptions.appendChild(dateInput);
     taskCardOptions.appendChild(prioritySelect);

 
     // Save and Cancel buttons
     const saveButton = document.createElement('div');
     saveButton.textContent = 'Save';
     saveButton.addEventListener('click', () => {
        handleTaskCreated(titleInput.value, descriptionInput.value, selectedDate, 
                          proyect, prioritySelect.value, proyect);
        taskCard.remove();
     });
 
     const cancelButton = document.createElement('div');
     cancelButton.textContent = 'Cancel';
     cancelButton.addEventListener('click', () => {
         taskButtonClicked = false;
         taskCard.remove();
     });
 
     taskCardOptions.appendChild(saveButton);
     taskCardOptions.appendChild(cancelButton);

    // Append task card text and options to the task card container
    taskCard.appendChild(taskCardText);
    taskCard.appendChild(taskCardOptions);
    
    return taskCard;
}

function createModifyTaskCard(task, oldTaskCard) {
    let taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    const taskCardText = document.createElement('div');
    taskCardText.className = 'task-card-text';

    // Create editable elements that visually match <h3> and <div>
    const titleElement = document.createElement('h3');
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = task.title;
    titleInput.className = "task-input";
    titleElement.appendChild(titleInput);

    const descriptionElement = document.createElement('div');
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = task.description;
    descriptionInput.className = "task-textarea";
    descriptionElement.appendChild(descriptionInput);

    // Append the editable elements to the task card text container
    taskCardText.appendChild(titleElement);
    taskCardText.appendChild(descriptionElement);

    // Append inputs to task card text container
    taskCardText.appendChild(titleInput);
    taskCardText.appendChild(descriptionInput);

    const taskCardOptions = document.createElement('div');
    taskCardOptions.className = 'task-card-options';
     // Option to choose priority
     const prioritySelect = document.createElement('select');
     prioritySelect.className = "task-select";
     const priorities = ['1', '2', '3'];
     priorities.forEach(priority => {
         const option = document.createElement('option');
         option.value = priority;
         option.textContent = `Priority ${priority}`;
         prioritySelect.appendChild(option);
     });
 
     taskCardOptions.appendChild(prioritySelect);

 
     // Save and Cancel buttons
     const saveButton = document.createElement('div');
     saveButton.textContent = 'Save';
     saveButton.addEventListener('click', () => {
        handleTaskModifyFinished(titleInput.value, descriptionInput.value, 100, prioritySelect.value, task, taskCard);
     });
 
     const cancelButton = document.createElement('div');
     cancelButton.textContent = 'Cancel';
     cancelButton.addEventListener('click', () => {
        handleCancelModify(taskCard, oldTaskCard);
     });
 
     taskCardOptions.appendChild(saveButton);
     taskCardOptions.appendChild(cancelButton);

    // Append task card text and options to the task card container
    taskCard.appendChild(taskCardText);
    taskCard.appendChild(taskCardOptions);

    
    return taskCard;
}

function handleTaskCreated(title, value, date, project, prior, actualProyect){
    const createdTask = new Task(title, value, date, project, prior);
    actualProyect.addTask(createdTask);
    saveProjects();
    taskButtonClicked = false;
    onProjectChange(actualProyect);
}

function handleTaskModify(task, taskCard){
    let editableTaskCard = createModifyTaskCard(task, taskCard);
    taskCard.parentNode.replaceChild(editableTaskCard, taskCard);
}

function handleTaskModifyFinished(title, description, date, prior, task, oldTaskCard){
    task.modify(title, description, null, task.project, prior);
    saveProjects();
    let newTaskCard = createTaskCard(task);
    oldTaskCard.parentNode.replaceChild(newTaskCard, oldTaskCard);
}

function handleCancelModify(newTaskCard, oldTaskCard){
    newTaskCard.parentNode.replaceChild(oldTaskCard, newTaskCard);
}

function handleDelete(task, taskCard){
    task.proyect.removeTask(task);
    taskCard.remove(); 
    saveProjects();
}

export {createTaskCard, createTaskContainer};



