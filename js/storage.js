export default class Storage {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Storage.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(taskName) {
        const tasks = Storage.getTasks();
        const filteredTasks = tasks.filter(task => task.name !== taskName);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    static getTaskByName(taskName) {
        const tasks = Storage.getTasks();
        return tasks.find(task => task.name === taskName);
    }

    static updateTask(updatedTask) {
        const tasks = Storage.getTasks();
        const taskIndex = tasks.findIndex(task => task.name === updatedTask.name);
        tasks[taskIndex] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
