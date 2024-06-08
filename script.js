// script.js

document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    saveTask(taskText);

    taskInput.value = '';
}

function createTaskItem(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    return li;
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    removeTaskFromLocalStorage(taskItem);
}

function saveTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasksFromLocalStorage();
    const taskText = taskItem.firstElementChild.textContent;
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
