/*const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota POST para criar uma nova tarefa
router.post('/', authMiddleware, taskController.createTask);

// Rota GET para listar tarefas
router.get('/', authMiddleware, taskController.getTasks);

// Futuramente, você pode adicionar outras rotas de CRUD, como UPDATE e DELETE.
// Exemplo de como seria a rota PUT para atualizar uma tarefa (com ID)
// router.put('/:id', authMiddleware, taskController.updateTask);
// Exemplo de como seria a rota DELETE para excluir uma tarefa (com ID)
// router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;*/

const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota POST para criar uma nova tarefa
router.post('/', authMiddleware, taskController.createTask);

// Rota GET para listar tarefas
router.get('/', authMiddleware, taskController.getTasks);

// Rota PUT para atualizar uma tarefa existente
router.put('/:id', authMiddleware, taskController.updateTask);

// Rota DELETE para excluir uma tarefa existente
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;