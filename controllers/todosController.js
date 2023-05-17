const fs = require('fs');
const todosFilePath = './todos.json';

// GET all todos
const getAllTodos = (req, res) => {
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
};

// POST new todo

// GET todo by id
const getOneTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  fs.readFile(todosFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to read todos file. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      const todo = todos.filter((item) => item.id === searchId);

      if (!todo) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Cannot find todos data.' });
    }
  });
};

// DELETE todo by id
const deleteTodo = (req, res) => {
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
};

module.exports = {
  getAllTodos,
  getOneTodo,
  deleteTodo,
};
