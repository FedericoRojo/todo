class Task {
    constructor(title, description, date, proyect, prior){
        this.title = title;
        this. description = description;
        this.date = date;
        this.proyect = proyect;
        this.prior = prior;
        this.completed = false;
        this.id = this.generateUniqueId();
    }

    generateUniqueId() {
        return Date.now() + Math.floor(Math.random() * 1000); // Adds a random number to the current timestamp
    }


    complete(){
        this.completed = true;
    }

    uncomplete(){
        this.uncompleted = false;
    }

    modify(title, description, date, proyect, prior){
        if(title != null){
            this.title = title;
        }
        if(description != null){
            this.description = description;
        }
        if(date != null){
            this.date = date;
        }
        if(proyect != null){
            this.proyect = proyect;
        }
        if( prior != null){
            this.prior = prior;
        }
        if( this.completed != null){
            this.completed = this.completed
        }
    }

}

export default Task;