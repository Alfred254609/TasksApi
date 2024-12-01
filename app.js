const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Definindo as rotas
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});