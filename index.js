const express = require('express');
const fs = require('node:fs');
const app = express();
const PORT = 3000;
const todosFilePath = './todos.json';

app.use(express.json());

// GET all todos
app.get('/todos', (req, res) => {
  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed load todos. File not found' });
    }
    try {
      const todos = JSON.parse(data);
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Failed to read todos file.' });
    }
  });
});

// POST new todo

// GET todo by id
app.get('/todos/:id', (req, res) => {
  const searchId = parseInt(req.params.id);
  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to read todos file. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      const todo = todos.find((item) => item.id === searchId);

      if (!todo) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Cannot find todos data.' });
    }
  });
});

// DELETE todo by id
app.delete('/todos/:id', (req, res) => {
  const searchId = parseInt(req.params.id);

  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to read todos file. File not found' });
    }
    try {
      let todos = JSON.parse(data);
      const filteredTodos = todos.filter((todo) => todo.id !== searchId);

      if (todos.length === filteredTodos.length) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      fs.writeFile(todosFilePath, JSON.stringify(filteredTodos, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(404).json({ error: 'Failed to delete todo.' });
        }
        res.sendStatus(204);
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Cannot find todos data.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
