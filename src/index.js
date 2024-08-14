import "./styles.css";
export const supportedLocales = ["en-US", "de", "pl", "it"];
import {createTaskContainer} from "./taskCard.js";
import Task from "./task.js";
import Proyect from "./Proyect.js";
import { createHeader } from "./header.js";



const Proyect1 = new Proyect("Proyect 1");
const Proyect2 = new Proyect("Proyect 2");
const Proyect3 = new Proyect("Proyect 3");

let Task1 = new Task("T1", "Loremsadasjdsakdkasd", 100, Proyect2, 1);
let Task2 = new Task("T2", "Loremsadasjdsakdkasd", 100, Proyect2, 1);
let Task3 = new Task("T3", "Loremsadasjdsakdkasd", 100, Proyect2, 1);
Proyect2.addTask(Task1);
Proyect2.addTask(Task2);
Proyect2.addTask(Task3);

let allProyects = [Proyect1, Proyect2, Proyect3];


const taskContainer = createTaskContainer(Proyect2);
document.body.appendChild(createHeader(allProyects, Proyect2));
let firstPrintedTaskContainer = document.body.appendChild(taskContainer);

function onProjectChange(selectedProject) {
    const existingTaskContainer = document.querySelector('header + .task-container');
    if (existingTaskContainer) {
        existingTaskContainer.remove();
    }
    let taskContainer = createTaskContainer(selectedProject);
    document.body.appendChild(taskContainer);
};

export {onProjectChange};