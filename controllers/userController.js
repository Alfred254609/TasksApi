/*const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Mudei para o jsonwebtoken
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário no banco de dados
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // Adicionei log para capturar mais detalhes no console
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compara a senha fornecida com a armazenada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retorna o token para o usuário
    res.json({ token });
  } catch (err) {
    console.error(err); // Log de erro
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };