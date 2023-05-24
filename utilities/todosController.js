'use strict';

const { handleFileReadError, handleFileWriteError } = require('../middleware/errorHandler');
const { readTodosFile, writeTodosFile } = require('./fileController');

const Todo = require('../models/todo');
const todosFilePath = './data/todos.json';

// GET all todos
const getAllTodos = (req, res) => {
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      return handleFileReadError(err, res);
    }

    res.status(200).json(todos);
  });
};

// GET todo by id
const getOneTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      return handleFileReadError(err, res);
    }

    const todo = todos.find((item) => item.id === searchId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo item not found.' });
    }

    res.status(200).json(todo);
  });
};

// DELETE todo by id
const deleteTodo = (req, res) => {
  const searchId = parseInt(req.params.id);

  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      return handleFileReadError(err, res);
    }

    const filteredTodos = todos.filter((todo) => todo.id !== searchId);

    if (todos.length === filteredTodos.length) {
      return res.status(404).json({ error: 'Todo item not found.' });
    }

    writeTodosFile(todosFilePath, filteredTodos, res, 'Todo item deleted successfully.');
  });
};

// POST new todo
const addNewTodo = (req, res) => {
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      return handleFileReadError(err, res);
    }

    const newId = Math.max(...todos.map((todo) => todo.id)) + 1;
    const newTodo = new Todo(newId, `Title ${newId}`, false);

    todos.push(newTodo);

    writeTodosFile(todosFilePath, todos, res, todos);
  });
};

// PATCH existing todo by id
const updateTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      return handleFileReadError(err, res);
    }

    const todo = todos.find((item) => item.id === searchId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo item not found.' });
    }

    todo.title !== 'Updated' ? (todo.title = 'Updated') : (todo.title = `Updated again`);
    todo.completed = !todo.completed;

    writeTodosFile(todosFilePath, todos, res, todo);
  });
};

module.exports = {
  getAllTodos,
  getOneTodo,
  deleteTodo,
  addNewTodo,
  updateTodo,
};
