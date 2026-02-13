import express, { Application, Request, Response } from 'express';
import todoRoutes from './routes/todos';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Todo API',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

app.use('/api/todos', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/todos`);
});
