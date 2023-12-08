// ./config/middleware.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
const { verifyToken } = require('../services/usuarioService');
const { Usuario } = require('../models');

// Função para verificar se o usuário é um administrador
const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const user = await Usuario.findByPk(userId);

    if (user && user.isAdmin) {
      req.user.isAdmin = user.isAdmin; // Atualiza a propriedade isAdmin no objeto de usuário
      next();
    } else {
      console.log('Acesso não autorizado. Este usuário não é um administrador.');
      return res.status(403).json({ error: 'Acesso não autorizado. Este usuário não é um administrador.' });
    }
  } catch (error) {
    console.error('Erro ao verificar se o usuário é administrador:', error);
    return res.status(500).json({ error: 'Erro interno ao verificar permissões' });
  }
};

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  const tokenValue = tokenParts[1];

  try {
    const user = await verifyToken(tokenValue);
    req.user = { userId: user.userId };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    } else {
      console.error('Erro durante a verificação do token:', error);
      return res.status(403).json({ error: 'Falha na verificação do token' });
    }
  }
};

module.exports = {
  authenticateJWT,
  isAdmin,
};
