import './style.css';
import {
  addTask,
  deleteTask,
  saveTasks,
  editTaskDescription,
  loadTasksFromLocalStorage,
} from './modules/todoFunctions.js';
import { updateTaskStatus, clearCompletedTasks } from './modules/statusFunctions.js';

const listNameElement = document.getElementById('list-name');
const newTaskInputElement = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskListElement = document.getElementById('task-list');
const clearCompletedButton = document.getElementById('clear-completed');

const listName = "Today's To-Do List";
let tasks = loadTasksFromLocalStorage();

function renderTasks() {
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-item-checkbox';
    listItem.appendChild(checkbox);

    const descriptionElement = document.createElement('span');
    descriptionElement.textContent = task.description;
    descriptionElement.className = 'task-item-description';
    listItem.appendChild(descriptionElement);

    const deleteButton = document.createElement('span');
    deleteButton.className = 'task-item-delete fas fa-trash';
    listItem.appendChild(deleteButton);

    const optionsButton = document.createElement('span');
    optionsButton.className = 'task-item-options fas fa-ellipsis-v';
    listItem.appendChild(optionsButton);

    taskListElement.appendChild(listItem);

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      updateTaskStatus(tasks);
      saveTasks(tasks);
    });

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTask(tasks, index);
      renderTasks();
      saveTasks(tasks);
    });

    descriptionElement.addEventListener('click', () => {
      descriptionElement.contentEditable = true;
      descriptionElement.focus();
    });

    descriptionElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        descriptionElement.blur();
      }
    });

    descriptionElement.addEventListener('blur', () => {
      descriptionElement.contentEditable = false;
      const newDescription = descriptionElement.textContent.trim();
      if (newDescription !== task.description) {
        editTaskDescription(tasks, index, newDescription);
        saveTasks(tasks);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  listNameElement.textContent = listName;
  renderTasks();

  addTaskButton.addEventListener('click', () => {
    const addNewTask = () => {
      const description = newTaskInputElement.value.trim();
      if (description) {
        addTask(tasks, description);
        newTaskInputElement.value = '';
        renderTasks();
        saveTasks(tasks);
      }
    };

    addNewTask();
  });

  newTaskInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const addNewTask = () => {
        const description = newTaskInputElement.value.trim();
        if (description) {
          addTask(tasks, description);
          newTaskInputElement.value = '';
          renderTasks();
          saveTasks(tasks);
        }
      };

      addNewTask();
    }
  });

  clearCompletedButton.addEventListener('click', () => {
    tasks = clearCompletedTasks(tasks);
    renderTasks();
    saveTasks(tasks);
  });
});
