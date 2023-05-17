'use strict';

const fs = require('fs');
const todosFilePath = './todos.json';

// GET all todos
const getAllTodos = (req, res) => {
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed load todos. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Failed to read todos file.' });
    }
  });
};

// GET todo by id
const getOneTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
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

  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to read todos file. File not found' });
    }
    try {
      const todos = JSON.parse(data);
      const filteredTodos = todos.filter((todo) => todo.id !== searchId);
      res.sendStatus(204);

      if (todos.length === filteredTodos.length) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      fs.writeFile(todosFilePath, JSON.stringify(filteredTodos, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(404).json({ error: 'Failed to delete todo.' });
        }
        res.status(204);
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Cannot find todos data.' });
    }
  });
};

// POST new todo
// TODO: fix id unique
const postTodo = (req, res) => {
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to load todos. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      const newId = todos.length + 1;
      const newTodo = { id: newId, title: `Title ${newId}`, completed: false };

      todos.push(newTodo);

      fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(404).json({ error: 'Failed to add new todo.' });
        }
        res.sendStatus(204);
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Failed load todos. File not found' });
    }
  });
};

module.exports = {
  getAllTodos,
  getOneTodo,
  deleteTodo,
  postTodo,
};
