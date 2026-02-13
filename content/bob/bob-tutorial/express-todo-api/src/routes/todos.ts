import { Router, Request, Response } from 'express';
import { db } from '../db';
import { CreateTodoInput, UpdateTodoInput } from '../models/todo';

const router = Router();

// GET /api/todos - Get all todos
router.get('/', (req: Request, res: Response) => {
  const todos = db.getAll();
  res.json(todos);
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', (req: Request, res: Response) => {
  const todo = db.getById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.json(todo);
});

// POST /api/todos - Create a new todo
router.post('/', (req: Request, res: Response) => {
  const input: CreateTodoInput = req.body;

  if (!input.title || input.title.trim() === '') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const todo = db.create(input.title.trim());
  res.status(201).json(todo);
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', (req: Request, res: Response) => {
  const input: UpdateTodoInput = req.body;
  const todo = db.update(req.params.id, input);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  res.json(todo);
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = db.delete(req.params.id);

  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  res.status(204).send();
});

export default router;
