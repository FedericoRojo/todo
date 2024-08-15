class Proyect {
    constructor(title){
        this.id = this.generateUniqueId();
        this.title = title;
        this.taskList = [];
    }

    generateUniqueId() {
        return Date.now() + Math.floor(Math.random() * 1000); // Adds a random number to the current timestamp
    }

    addTask(task){
        this.taskList.push(task);
    }

    removeTask(task){
        this.taskList = this.taskList.filter(t => t != task);
    }
}

export default Proyect;