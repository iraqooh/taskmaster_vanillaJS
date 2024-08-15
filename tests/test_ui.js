import UI from '../js/ui.js';
import Task from '../js/task.js';

function testAddTaskToList() {
    const task = new Task('Test Task', '2024-08-15', 'high');
    UI.addTaskToList(task);
    const taskList = document.getElementById('task-list');
    console.assert(taskList.children.length === 1, `Expected 1 task in list but got ${taskList.children.length}`);
}

function testDeleteTask() {
    const taskList = document.getElementById('task-list');
    const deleteBtn = taskList.querySelector('.delete-btn');
    UI.deleteTask(deleteBtn);
    console.assert(taskList.children.length === 0, `Expected 0 tasks in list but got ${taskList.children.length}`);
}

document.body.innerHTML = '<ul id="task-list" class="list-group mt-4"></ul>';

testAddTaskToList();
testDeleteTask();
console.log('All UI tests passed.');
