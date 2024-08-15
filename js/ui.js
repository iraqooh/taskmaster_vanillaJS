import Storage from './storage.js';

export default class UI {
    static displayTasks() {
        const tasks = Storage.getTasks();
        tasks.forEach(task => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.getElementById('task-list');

        const taskItem = document.createElement('div');
        taskItem.className = `task-item list-group-item ${task.priority}`;
        taskItem.dataset.name = task.name;

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'task-completed' : ''}">${task.name} (Due: ${task.dueDate})</span>
            <span class="badge badge-secondary">${task.category}</span>
            <button class="delete-btn btn btn-danger btn-sm float-right">Delete</button>
        `;

        list.appendChild(taskItem);
    }

    static deleteTask(element) {
        if (element.classList.contains('delete-btn')) {
            element.parentElement.remove();
        }
    }

    static clearFields() {
        document.getElementById('task-name').value = '';
        document.getElementById('task-due-date').value = '';
        document.getElementById('task-priority').value = 'Low';
        document.getElementById('task-category').value = '';
    }

    static updateTaskCompletion(taskItem) {
        const checkbox = taskItem.querySelector('.task-checkbox');
        const taskNameSpan = taskItem.querySelector('span');

        if (checkbox.checked) {
            taskNameSpan.classList.add('task-completed');
        } else {
            taskNameSpan.classList.remove('task-completed');
        }
    }

    static filterTasks(keyword) {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const taskName = task.querySelector('span').textContent.toLowerCase();
            const taskCategory = task.querySelector('.badge').textContent.toLowerCase();
            if (taskName.includes(keyword) || taskCategory.includes(keyword)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    static updateNotifications() {
        const tasks = Storage.getTasks();
        const upcomingTasks = tasks.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            const now = new Date();
            const timeDifference = taskDueDate.getTime() - now.getTime();
            return timeDifference <= 24 * 60 * 60 * 1000 && timeDifference > 0 && !task.completed;
        });

        const notificationBadge = document.getElementById('notification-badge');
        
        if (upcomingTasks.length > 0) {
            notificationBadge.classList.remove('d-none');
            notificationBadge.textContent = upcomingTasks.length;
        } else {
            notificationBadge.classList.add('d-none');
        }
    }

    static displayUpcomingTasks() {
        const tasks = Storage.getTasks();
        const upcomingTasks = tasks.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            const now = new Date();
            const timeDifference = taskDueDate.getTime() - now.getTime();
            return timeDifference <= 24 * 60 * 60 * 1000 && timeDifference > 0 && !task.completed;
        });

        const upcomingTasksDropdown = document.getElementById('upcoming-tasks');
        upcomingTasksDropdown.innerHTML = '';

        upcomingTasks.forEach(task => {
            const taskItem = document.createElement('a');
            taskItem.className = 'dropdown-item';
            taskItem.textContent = `${task.name} (Due: ${task.dueDate})`;
            taskItem.href = '#';

            taskItem.addEventListener('click', () => {
                const taskInList = document.querySelector(`[data-name="${task.name}"]`);
                const checkbox = taskInList.querySelector('.task-checkbox');
                checkbox.checked = true;
                UI.updateTaskCompletion(taskInList);
                task.completed = true;
                Storage.updateTask(task);
                UI.updateNotifications();
            });

            upcomingTasksDropdown.appendChild(taskItem);
        });
    }
}
