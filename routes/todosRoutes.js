'use strict';

const express = require('express');
const {
  getAllTodos,
  addNewTodo,
  getOneTodo,
  deleteTodo,
  updateTodo,
} = require('../utilities/todosController.js');

const router = express.Router();

// GET all todos
router.get('/todos', getAllTodos);

// POST one todo
router.post('/todos', addNewTodo);

// GET one todo by id
router.get('/todos/:id', getOneTodo);

// DELETE one todo by id
router.delete('/todos/:id', deleteTodo);

// PATCH one todo by id
router.patch('/todos/:id', updateTodo);

module.exports = router;
