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

    tasksInDay(day){
        let result = [];
        if(this.taskList.length != 0){
            this.taskList.forEach(task => {
                let taskDate = new Date(task.date);
                let compareDate = new Date(day);
                if (
                    taskDate.getFullYear() === compareDate.getFullYear() &&
                    taskDate.getMonth() === compareDate.getMonth() &&
                    taskDate.getDate() === compareDate.getDate()
                ) {
                    result.push(task);
                }
            })
        }
        return result;
    }
}

export default Proyect;