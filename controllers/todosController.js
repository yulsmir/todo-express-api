'use strict';

const { handleFileReadError, handleFileWriteError } = require('../handlers/errorHandlers');
const { readTodosFile, writeTodosFile } = require('../handlers/fileHandlers');

const Todo = require('../models/todo');
const todosFilePath = './todos.json';

// GET all todos
const getAllTodos = (req, res) => {
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      handleFileReadError(err, res);
      return;
    }

    res.status(200).json(todos);
  });
};

// GET todo by id
const getOneTodo = (req, res) => {
  const searchId = parseInt(req.params.id);
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      handleFileReadError(err, res);
      return;
    }

    const todo = todos.find((item) => item.id === searchId);

    if (!todo) {
      res.status(404).json({ error: 'Todo item not found.' });
      return;
    }

    res.status(200).json(todo);
  });
};

// DELETE todo by id
const deleteTodo = (req, res) => {
  const searchId = parseInt(req.params.id);

  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      handleFileReadError(err, res);
      return;
    }

    const filteredTodos = todos.filter((todo) => todo.id !== searchId);

    if (todos.length === filteredTodos.length) {
      res.status(404).json({ error: 'Todo item not found.' });
      return;
    }

    writeTodosFile(todosFilePath, filteredTodos, res, 'Todo item deleted successfully.');
  });
};

// POST new todo
// TODO: fix id is unique!!!
const addNewTodo = (req, res) => {
  readTodosFile(todosFilePath, (err, todos) => {
    if (err) {
      handleFileReadError(err, res);
      return;
    }

    const newId = todos.length;
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
      handleFileReadError(err, res);
      return;
    }

    const todo = todos.find((item) => item.id === searchId);

    if (!todo) {
      res.status(404).json({ error: 'Todo item not found.' });
      return;
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
