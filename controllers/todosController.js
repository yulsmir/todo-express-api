'use strict';

const fs = require('fs');
const todosFilePath = './todos.json';
const Todo = require('../models/todo');

// TODO: remove repeating code into a separate functions/constants
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
// TODO: fix id is unique
const addNewTodo = (req, res) => {
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to load todos. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      const newId = todos.length;
      const newTodo = new Todo(newId, `Title ${newId}`, false);

      todos.push(newTodo);

      fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(404).json({ error: 'Failed to add new todo.' });
        }
        res.json(todos);
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Failed load todos. File not found' });
    }
  });
};

// PATCH existing todo by id
const updateTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'Failed to load todos. File not found' });
    }

    try {
      const todos = JSON.parse(data);
      const todo = todos.find((item) => item.id === searchId);
      if (!todo) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      todo.title !== 'Updated' ? (todo.title = 'Updated') : (todo.title = `Updated again`);

      todo.completed === true ? (todo.completed = false) : (todo.completed = true);
      fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(404).json({ error: 'Failed to add new todo.' });
        }
        res.json(todo);
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
  addNewTodo,
  updateTodo,
};
