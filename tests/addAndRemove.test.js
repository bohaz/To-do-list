import { describe, test, expect } from '@jest/globals';
import { addTask, deleteTask } from '../src/modules/todoFunctions.js';

describe('addTask', () => {
  test('should add a task to an empty tasks array', () => {
    // Arrange
    const tasks = [];
    const description = 'Task 1';

    // Act
    addTask(tasks, description);

    // Assert
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Task 1');
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].index).toBe(1);
  });

  test('should add a task to an existing tasks array', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
    ];
    const description = 'Task 2';

    // Act
    addTask(tasks, description);

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks[1].description).toBe('Task 2');
    expect(tasks[1].completed).toBe(false);
    expect(tasks[1].index).toBe(2);
  });

  // Add more test cases as needed
});

test('should add a task with the correct index', () => {
  // Arrange
  const tasks = [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: false, index: 2 },
  ];
  const description = 'Task 3';

  // Act
  addTask(tasks, description);

  // Assert
  expect(tasks.length).toBe(3);
  expect(tasks[2].description).toBe('Task 3');
  expect(tasks[2].completed).toBe(false);
  expect(tasks[2].index).toBe(3);
});

test('should add a task with the correct completed status', () => {
  // Arrange
  const tasks = [
    { description: 'Task 1', completed: true, index: 1 },
  ];
  const description = 'Task 2';

  // Act
  addTask(tasks, description);

  // Assert
  expect(tasks.length).toBe(2);
  expect(tasks[1].description).toBe('Task 2');
  expect(tasks[1].completed).toBe(false);
  expect(tasks[1].index).toBe(2);
});

describe('deleteTask', () => {
  test('should delete a task when there is only 1 task in tasks', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
    ];
    const indexToDelete = 0;

    // Act
    deleteTask(tasks, indexToDelete);

    // Assert
    expect(tasks.length).toBe(0);
  });

  test('should delete a task when there is more than 1 task in tasks', () => {
    // Arrange
    const tasks = [{ description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    const indexToDelete = 1;

    // Act
    deleteTask(tasks, indexToDelete);

    // Assert
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Task 1');
  });

  test('should update indexes of tasks after deleting a task', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
    const indexToDelete = 1; // Index of the task to delete

    // Act
    deleteTask(tasks, indexToDelete);

    // Assert
    expect(tasks[0].index).toBe(1);
    expect(tasks[1].index).toBe(2);
  });

  test('should not modify tasks array if the index is out of bounds', () => {
    // Arrange
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    const invalidIndex = 5; // Index out of bounds

    // Act
    deleteTask(tasks, invalidIndex);

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks[0].description).toBe('Task 1');
    expect(tasks[1].description).toBe('Task 2');
  });
});