import Task from '../js/task.js';

function testTaskCreation() {
    const task = new Task('Test Task', '2024-08-15', 'high');
    console.assert(task.name === 'Test Task', `Expected 'Test Task' but got ${task.name}`);
    console.assert(task.dueDate === '2024-08-15', `Expected '2024-08-15' but got ${task.dueDate}`);
    console.assert(task.priority === 'high', `Expected 'high' but got ${task.priority}`);
}

testTaskCreation();
console.log('All Task tests passed.');
