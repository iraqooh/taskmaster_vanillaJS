import Task from './task.js';
import Storage from './storage.js';
import UI from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    UI.displayTasks();
    UI.updateNotifications();
});

// Toggle task form visibility
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskForm = document.getElementById('task-form');
    taskForm.style.display = (taskForm.style.display === 'none' || taskForm.style.display === '') ? 'block' : 'none';
});

// Add Task
document.getElementById('saveTaskBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDueDate = document.getElementById('task-due-date').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskCategory = document.getElementById('task-category').value;
    const taskCompleted = false;

    if (taskName === '' || taskDueDate === '') {
        alert('Please fill in all fields');
    } else {
        const task = new Task(taskName, taskDueDate, taskPriority, taskCategory, taskCompleted);
        UI.addTaskToList(task);
        Storage.addTask(task);
        UI.clearFields();
        UI.updateNotifications();
    }
});

// Delete or Complete Task
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        UI.deleteTask(e.target);
        Storage.removeTask(e.target.parentElement.dataset.name);
    } else if (e.target.classList.contains('task-checkbox')) {
        const taskName = e.target.parentElement.dataset.name;
        const task = Storage.getTaskByName(taskName);
        task.completed = e.target.checked;
        Storage.updateTask(task);
        UI.updateTaskCompletion(e.target.parentElement);
    }
    UI.updateNotifications();
});

// Search Tasks
document.getElementById('search-bar').addEventListener('keyup', (e) => {
    const keyword = e.target.value.toLowerCase();
    UI.filterTasks(keyword);
});

// Upcoming Task Notification
document.getElementById('upcomingTasksDropdown').addEventListener('click', UI.displayUpcomingTasks);
