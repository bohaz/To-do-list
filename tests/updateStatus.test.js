import { describe, test, expect } from '@jest/globals';
import { updateTaskStatus, clearCompletedTasks } from '../src/modules/statusFunctions.js';

describe('updateTaskStatus', () => {
  test('should update the status of a task to completed', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: false },
    ];
    const indexToUpdate = 0;
    const completedStatus = true;

    // Act
    updateTaskStatus(tasks, indexToUpdate, completedStatus);

    // Assert
    expect(tasks[indexToUpdate].completed).toBe(true);
  });

  test('should update the status of a task to not completed', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: true },
    ];
    const indexToUpdate = 1;
    const completedStatus = false;

    // Act
    updateTaskStatus(tasks, indexToUpdate, completedStatus);

    // Assert
    expect(tasks[indexToUpdate].completed).toBe(false);
  });

  test('should not modify tasks array if the index is out of bounds', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: false },
    ];
    const invalidIndex = 5;
    const completedStatus = true;

    // Act
    updateTaskStatus(tasks, invalidIndex, completedStatus);

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks[0].completed).toBe(false);
    expect(tasks[1].completed).toBe(false);
  });
});

describe('clearCompletedTasks', () => {
  test('should remove completed tasks from the tasks array', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: false },
      { description: 'Task 3', completed: true },
    ];

    // Act
    const filteredTasks = clearCompletedTasks(tasks);

    // Assert
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].description).toBe('Task 2');
    expect(filteredTasks[0].completed).toBe(false);
  });

  test('should return an empty array if there are no completed tasks', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: true },
    ];

    // Act
    const filteredTasks = clearCompletedTasks(tasks);

    // Assert
    expect(filteredTasks.length).toBe(0);
    expect(() => clearCompletedTasks([])).not.toThrow();
  });

  test('should not modify the original tasks array', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: false },
    ];

    // Act
    clearCompletedTasks(tasks);

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks[0].description).toBe('Task 1');
    expect(tasks[1].description).toBe('Task 2');
  });
});
