/*const Task = require('../models/task');
const Category = require('../models/category');
const { Op } = require('sequelize');

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, categoryId } = req.body;

    // Verificar se todos os campos necessários estão presentes
    if (!title || !due_date || !status || !priority) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Criar a tarefa no banco de dados
    const task = await Task.create({
      title,
      description,
      due_date,
      status,
      priority,
      categoryId,
      userId: req.user.id, // Associe o usuário autenticado à tarefa
    });

    // Responder com a tarefa criada
    res.status(201).json(task);
  } catch (err) {
    console.error(err); // Logar o erro para depuração
    res.status(500).json({ error: 'Erro ao criar a tarefa. Tente novamente mais tarde.' });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, categoryId, priority, overdue } = req.query;
    let whereConditions = { userId: req.user.id };

    // Aplicar os filtros
    if (status) whereConditions.status = status;
    if (categoryId) whereConditions.categoryId = categoryId;
    if (priority) whereConditions.priority = priority;
    if (overdue === 'true') {
      whereConditions.due_date = { [Op.lt]: new Date() }; // Tarefas vencidas
    }

    // Buscar as tarefas com os filtros aplicados
    const tasks = await Task.findAll({ where: whereConditions });

    // Retornar as tarefas encontradas
    res.json(tasks);
  } catch (err) {
    console.error(err); // Logar o erro para depuração
    res.status(500).json({ error: 'Erro ao recuperar as tarefas. Tente novamente mais tarde.' });
  }
};

module.exports = {
  createTask,
  getTasks,
};*/

const Task = require('../models/task');
const Category = require('../models/category');
const { Op } = require('sequelize');

// Função para criar uma tarefa
const createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, categoryId } = req.body;

    // Verificar se todos os campos necessários estão presentes
    if (!title || !due_date || !status || !priority) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Criar a tarefa no banco de dados
    const task = await Task.create({
      title,
      description,
      due_date,
      status,
      priority,
      categoryId,
      userId: req.user.id, // Associe o usuário autenticado à tarefa
    });

    // Responder com a tarefa criada
    res.status(201).json(task);
  } catch (err) {
    console.error(err); // Logar o erro para depuração
    res.status(500).json({ error: 'Erro ao criar a tarefa. Tente novamente mais tarde.' });
  }
};

// Função para recuperar as tarefas
const getTasks = async (req, res) => {
  try {
    const { status, categoryId, priority, overdue } = req.query;
    let whereConditions = { userId: req.user.id };

    // Aplicar os filtros
    if (status) whereConditions.status = status;
    if (categoryId) whereConditions.categoryId = categoryId;
    if (priority) whereConditions.priority = priority;
    if (overdue === 'true') {
      whereConditions.due_date = { [Op.lt]: new Date() }; // Tarefas vencidas
    }

    // Buscar as tarefas com os filtros aplicados
    const tasks = await Task.findAll({ where: whereConditions });

    // Retornar as tarefas encontradas
    res.json(tasks);
  } catch (err) {
    console.error(err); // Logar o erro para depuração
    res.status(500).json({ error: 'Erro ao recuperar as tarefas. Tente novamente mais tarde.' });
  }
};

// Função para atualizar uma tarefa
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status, priority, categoryId } = req.body;

  try {
    // Buscar a tarefa no banco de dados
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    // Atualizar os campos da tarefa
    task.title = title || task.title;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.categoryId = categoryId || task.categoryId;

    // Salvar a tarefa atualizada
    await task.save();

    res.json(task); // Retornar a tarefa atualizada
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar a tarefa. Tente novamente mais tarde.' });
  }
};

// Função para remover uma tarefa
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar a tarefa no banco de dados
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    // Excluir a tarefa
    await task.destroy();

    res.status(204).json({ message: 'Tarefa excluída com sucesso.' }); // Resposta de sucesso
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir a tarefa. Tente novamente mais tarde.' });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};