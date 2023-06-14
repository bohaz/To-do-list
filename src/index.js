import './style.css';

const listName = "Today's To-Do List";

const tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete To Do list project', completed: true, index: 2 },
  { description: 'wash the car', completed: false, index: 3 },
];

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  const listNameHeader = document.createElement('h1');
  listNameHeader.textContent = listName;
  todoList.appendChild(listNameHeader);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.description));
    todoList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  if (todoList.children.length === tasks.length) {
    return;
  }

  todoList.innerHTML = '';

  const listNameHeader = document.createElement('h1');
  listNameHeader.textContent = listName;
  todoList.appendChild(listNameHeader);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.description));
    todoList.appendChild(listItem);
  });

  const clearCompletedButton = document.createElement('button');
  clearCompletedButton.textContent = 'Clear All Completed';
  clearCompletedButton.classList.add('clear-button');
  todoList.appendChild(clearCompletedButton);

  clearCompletedButton.addEventListener('click', () => {
    tasks.forEach((task) => {
      if (task.completed) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
      }
    });

    renderTasks();
  });
});
