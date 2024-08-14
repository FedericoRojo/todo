import Task from "./task";

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
    const editOption = document.createElement('div');
    editOption.textContent = 'Editar';
    const priorityOption = document.createElement('div');
    priorityOption.textContent = task.prior;

    // Append options to taskCardOptions
    taskCardOptions.appendChild(deleteOption);
    taskCardOptions.appendChild(editOption);
    taskCardOptions.appendChild(priorityOption);

    // Append taskCardText and taskCardOptions to taskCard
    taskCard.appendChild(taskCardText);
    taskCard.appendChild(taskCardOptions);

    return taskCard;
}

function createTaskContainer(proyect) {
    let tasks = proyect.taskList;
    // Create the main task container
    const taskContainer = document.createElement('div');
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
        const taskCard = createEditableTaskCard(proyect);
        newTaskButton.parentNode.insertBefore(taskCard, newTaskButton.nextSibling);
    });

    // Append the new task button to the inner container
    innerContainer.appendChild(newTaskButton);

    // Create and add each task card to the inner container
    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        innerContainer.appendChild(taskCard);
    });

    // Append the inner container to the task container
    taskContainer.appendChild(emptyDiv1);
    taskContainer.appendChild(innerContainer);
    taskContainer.appendChild(emptyDiv2);
    
    return taskContainer;
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
 
     // Option to choose an existing project
     const projectSelect = document.createElement('select');
     projectSelect.className = "task-select";
     const projects = ['Project A', 'Project B', 'Project C']; // Replace with dynamic projects list
     projects.forEach(project => {
         const option = document.createElement('option');
         option.value = project;
         option.textContent = project;
         projectSelect.appendChild(option);
     });
 
     taskCardOptions.appendChild(projectSelect);
 
     // Save and Cancel buttons
     const saveButton = document.createElement('div');
     saveButton.textContent = 'Save';
     saveButton.addEventListener('click', () => {
        handleTaskCreated(titleInput.value, descriptionInput.value, Date.now(), 
                          projectSelect.value, prioritySelect.value, proyect);
     });
 
     const cancelButton = document.createElement('div');
     cancelButton.textContent = 'Cancel';
     cancelButton.addEventListener('click', () => {
         taskCard.remove();
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
    console.log(actualProyect);
}



export {createTaskCard, createTaskContainer};


/*
<div class="task-container">
        <div></div>
        <div>
            <div class="new-task-button">New Task</div>
            <div class="task-card">
                <div class="task-card-text">
                    <h3>Title</h3>
                    <div>Description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aut incidunt 
                        veritatis tempora error. Totam labore consequuntur fugit tenetur beatae minus delectus omnis, dolorem
                        asperiores nulla dicta fuga quae ipsum.</div>
                </div>
                <div class="task-card-options">
                    <div>Borrar</div>
                    <div>Editar</div>
                    <div>Prioridad</div>
                </div>
            </div>
        </div>
        <div></div>
</div>
*/
