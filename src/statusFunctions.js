export function updateTaskStatus(tasks, index, completed) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = completed;
  }
}

export function clearCompletedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}
