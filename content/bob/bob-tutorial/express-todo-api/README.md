# Express Todo API

A simple REST API for managing todos, built with Express and TypeScript.

This project uses Node.js 16 and older patterns that will be modernized to Node.js 22.

## Features

- CRUD operations for todos
- In-memory database
- TypeScript for type safety
- RESTful API design

## Prerequisites

- Node.js 16.x
- Docker (optional)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

### Run with Docker

```bash
docker build -t express-todo-api .
docker run -p 3000:3000 express-todo-api
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Example Usage

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create a new todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Bob IDE"}'

# Update a todo
curl -X PUT http://localhost:3000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```
