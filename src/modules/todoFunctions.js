export function addTask(tasks, description) {
  const newIndex = tasks.length;
  const newTask = {
    description,
    completed: false,
    index: newIndex + 1,
  };
  tasks.push(newTask);
}

function updateIndexes(tasks) {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

export function deleteTask(tasks, index) {
  tasks.splice(index, 1);
  updateIndexes(tasks);
}

export function editTaskDescription(tasks, index, newDescription) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].description = newDescription;
  }
}

export function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

export { updateIndexes as default };