const express = require('express');
const todosController = require('../controllers/todosController');

const router = express.Router();

// Get all todos
router.get('/todos', todosController.getAllTodos);

// Get one todo bu id
router.get('/todos:id', todosController.getOneTodo);

module.exports = router;
