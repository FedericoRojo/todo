class Proyect {
    constructor(title){
        this.title = title;
        this.taskList = [];
    }

    addTask(task){
        this.taskList.push(task);
    }

    removeTast(task){
        this.taskList = this.taskList.filter(t => t != task);
    }
}

export default Proyect;