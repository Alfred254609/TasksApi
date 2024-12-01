const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  // Obter o token do cabeçalho Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Se o token não estiver presente, retornar erro
  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Token não encontrado.' });
  }

  // Verificar o token usando a chave secreta do JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }

    // Adicionar as informações do usuário ao objeto `req`
    req.user = user;
    next(); // Passar o controle para a próxima função ou rota
  });
};

module.exports = authenticateToken;