import { format } from "date-fns";
import { savedProjects } from "./index.js";

let currentDay = new Date();  // This will be used to load future days.
let startDay = new Date(currentDay);  // This will be used to load past days.

function createCalendar() {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    const emptyDiv1 = document.createElement('div');

    const calendarContainer = document.createElement('div');
    calendarContainer.className = "calendar-container";

    loadDays(10, calendarContainer, true); // Load initial future days

    // Add scroll event listener for infinite scroll
    calendarContainer.addEventListener('scroll', () => {
        // Check if scrolled to the bottom for loading future days
        if (calendarContainer.scrollTop + calendarContainer.clientHeight >= calendarContainer.scrollHeight) {
            loadDays(10, calendarContainer, true); // Load more future days
        }

        // Check if scrolled to the top for loading past days
        if (calendarContainer.scrollTop === 0) {
            const initialScrollHeight = calendarContainer.scrollHeight;
            loadDays(10, calendarContainer, false); // Load more past days
            const newScrollHeight = calendarContainer.scrollHeight;
            calendarContainer.scrollTop = newScrollHeight - initialScrollHeight;
        }
    });

    taskContainer.appendChild(emptyDiv1);
    taskContainer.appendChild(calendarContainer);
    document.body.appendChild(taskContainer);

    return calendarContainer;
}

// Function to generate the HTML for a day
function createDayElement(date) {
    let taskInDay = [];
    if (savedProjects != null) {
        savedProjects.forEach(project => {
            let projectTaskInDay = project.tasksInDay(date);
            if (projectTaskInDay.length != 0) {
                taskInDay = taskInDay.concat(projectTaskInDay);
            }
        });
    }
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.textContent = format(date, 'dd/MM/yyyy');
    if (taskInDay.length != 0) {
        taskInDay.forEach(task => {
            let card = createCalendarCard(task);
            dayElement.appendChild(card);
        });
    }
    return dayElement;
}

function loadDays(numDays, container, forward = true) {
    for (let i = 0; i < numDays; i++) {
        const dateToAdd = new Date(forward ? currentDay : startDay);
        const dayElement = createDayElement(dateToAdd);

        if (forward) {
            container.appendChild(dayElement);
            currentDay.setDate(currentDay.getDate() + 1);
        } else {
            container.insertBefore(dayElement, container.firstChild);
            startDay.setDate(startDay.getDate() - 1);
        }
    }
}

function createCalendarCard(task) {
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

    const projectTag = document.createElement('div');
    projectTag.textContent = task.proyect.title;

    // Create the date tag
    const dateTag = document.createElement('div');
    dateTag.textContent = format(task.date, 'dd/MM/yyyy');

    const priorityOption = document.createElement('div');
    priorityOption.textContent = task.prior;

    // Append options to taskCardOptions
    taskCardOptions.appendChild(projectTag);
    taskCardOptions.appendChild(priorityOption);
    taskCardOptions.appendChild(dateTag);

    // Append taskCardText and taskCardOptions to taskCard
    taskCard.appendChild(taskCardText);
    taskCard.appendChild(taskCardOptions);

    return taskCard;
}

export { createCalendar };
