const express = require('express');
const todosController = require('../controllers/todosController');

const router = express.Router();

// GET all todos
router.get('/todos', todosController.getAllTodos);

// GET one todo by id
router.get('/todos/:id', todosController.getOneTodo);

// DELETE one todo by id
router.delete('/todos/:id', todosController.deleteTodo);

module.exports = router;
