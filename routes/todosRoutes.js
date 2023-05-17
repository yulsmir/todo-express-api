'use strict';

const express = require('express');
const todosController = require('../controllers/todosController');

const router = express.Router();

// GET all todos
router.get('/todos', todosController.getAllTodos);

// POST one todo
router.post('/todos', todosController.addNewTodo);

// GET one todo by id
router.get('/todos/:id', todosController.getOneTodo);

// DELETE one todo by id
router.delete('/todos/:id', todosController.deleteTodo);

// PATCH one todo by id
router.patch('/todos/:id', todosController.updateTodo);

module.exports = router;
