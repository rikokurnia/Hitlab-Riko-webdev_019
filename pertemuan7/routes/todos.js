const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Endpoint terhubung ke controller
router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);

module.exports = router;