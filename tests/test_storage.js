import Storage from '../js/storage.js';
import Task from '../js/task.js';

function testAddTask() {
    const task = new Task('Test Task', '2024-08-15', 'high');
    Storage.addTask(task);
    const tasks = Storage.getTasks();
    console.assert(tasks.length >= 1, `Expected 1 task but got ${tasks.length}`);
}

function testRemoveTask() {
    const beforeTasks = Storage.getTasks();
    Storage.removeTask('Test Task');
    const afterTasks = Storage.getTasks();
    let difference = beforeTasks.length - afterTasks.length;
    console.assert(difference === 1, `Expected ${afterTasks.length} tasks but got ${difference}`);
}

testAddTask();
testRemoveTask();
console.log('All Storage tests passed.');
