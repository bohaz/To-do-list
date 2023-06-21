import { describe, test, expect } from '@jest/globals';
import { addTask } from '../src/todoFunctions.js';

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