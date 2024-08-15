export default class Task {
    constructor(name, dueDate, priority, category, completed = false) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.completed = completed;
    }
}
