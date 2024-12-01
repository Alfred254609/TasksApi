/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  due_date: { type: DataTypes.DATE },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'overdue'),
    defaultValue: 'pending'
  },
  priority: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
  timestamps: true,  // Adiciona suporte para 'createdAt' e 'updatedAt'
});

module.exports = Task;*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  due_date: { type: DataTypes.DATE },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'overdue'),
    defaultValue: 'pending',
  },
  priority: { type: DataTypes.INTEGER, defaultValue: 1 },
  userId: { // Mudando de user_id para userId (camelCase)
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // Criação das colunas createdAt/updatedAt automaticamente
  underscored: false, // Não usar snake_case no banco
});

module.exports = Task;