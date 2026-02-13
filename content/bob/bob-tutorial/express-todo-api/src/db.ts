import { Todo } from './models/todo';
import { v4 as uuidv4 } from 'uuid';

// Simple in-memory database
class TodoDatabase {
  private todos: Map<string, Todo>;

  constructor() {
    this.todos = new Map();
    // Add some sample data
    const sampleTodo: Todo = {
      id: uuidv4(),
      title: 'Learn Node.js modernization',
      completed: false,
      createdAt: new Date()
    };
    this.todos.set(sampleTodo.id, sampleTodo);
  }

  public getAll(): Todo[] {
    return Array.from(this.todos.values());
  }

  public getById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  public create(title: string): Todo {
    const todo: Todo = {
      id: uuidv4(),
      title: title,
      completed: false,
      createdAt: new Date()
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  public update(id: string, updates: { title?: string; completed?: boolean }): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) {
      return undefined;
    }

    const updatedTodo: Todo = {
      ...todo,
      ...updates
    };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  public delete(id: string): boolean {
    return this.todos.delete(id);
  }
}

// Export a singleton instance
export const db = new TodoDatabase();
