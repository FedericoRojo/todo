import "./styles.css";
export const supportedLocales = ["en-US", "de", "pl", "it"];
import {createTaskContainer} from "./taskCard.js";
import Task from "./task.js";
import Proyect from "./Proyect.js";
import { createHeader } from "./header.js";
import { format } from 'date-fns';
import { createCalendar } from "./calendarPage.js";
import {parse, stringify} from "flatted";

let savedProjects;
document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    let aux = parse(localStorage.getItem('projects') || '[]');
    if( aux != null ){
        savedProjects = aux; 
    }else{
        savedProjects = [];
    }
    document.body.insertBefore(createHeader(null), document.body.firstChild);
});


function onProjectChange(selectedProject) {
    const existingTaskContainer = document.querySelector('header + .task-container');
    if (existingTaskContainer) {
        existingTaskContainer.remove();
        let taskContainer = createTaskContainer(selectedProject);
        document.body.appendChild(taskContainer);
    }else{
        let taskContainer = createTaskContainer(selectedProject);
        document.body.appendChild(taskContainer);
    }
};

function onCalendarChange(){
    const existingTaskContainer = document.querySelector('header + .task-container');
    if (existingTaskContainer) {
        existingTaskContainer.remove();
        createCalendar();
    }else{
        createCalendar();
    }
}


function saveProjects() {
    //localStorage.setItem('projects', JSON.stringify(savedProjects));
    localStorage.setItem('projects', stringify(savedProjects));
}

function loadProjects() {
    return parse(localStorage.getItem('projects') || '[]');
    /*const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : []; */
}



export {onProjectChange, onCalendarChange, savedProjects, saveProjects, loadProjects};

/*
const Proyect1 = new Proyect("Proyect 1");
const Proyect2 = new Proyect("Proyect 2");
const Proyect3 = new Proyect("Proyect 3");

let Task1 = new Task("T1", "Loremsadasjdsakdkasd", new Date(2024, 7, 19), Proyect2, 1);
let Task4 = new Task("T1", "Loremsadasjdsakdkasd", new Date(2024, 7, 19), Proyect2, 1);
let Task2 = new Task("T2", "Loremsadasjdsakdkasd", new Date(2024, 7, 21), Proyect2, 1);
let Task3 = new Task("T3", "Loremsadasjdsakdkasd", new Date(2024, 7, 21), Proyect2, 1);
Proyect2.addTask(Task1);
Proyect2.addTask(Task2);
Proyect2.addTask(Task3);
Proyect2.addTask(Task4);

*/