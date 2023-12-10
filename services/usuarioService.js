// services/usuarioService.js
// Importa as bibliotecas necessárias
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

// Função assíncrona para cadastrar um novo usuário
const cadastrarUsuario = async (nome, email, senha) => {
  try {
    // Hash da senha antes de salvar no banco de dados
    const hashedSenha = await bcrypt.hash(senha, 10);
    
    // Cria um novo usuário no banco de dados
    const usuario = await Usuario.create({ nome, email, senha: hashedSenha });
    return usuario;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao cadastrar usuário no serviço:', error);
    throw new Error('Erro ao cadastrar usuário no serviço');
  }
};

// Função assíncrona para autenticar um usuário
const autenticarUsuario = async (email, senha) => {
  try {
    // Busca o usuário no banco de dados pelo email fornecido
    const usuario = await Usuario.findOne({ where: { email } });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    // Se as senhas não coincidirem, lança uma exceção
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas');
    }

    // Gera um token de autenticação para o usuário
    const token = generateToken(usuario.id);

    // Retorna o usuário e o token
    return { usuario, token };
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro durante a autenticação do usuário:', error);
    throw new Error('Erro durante a autenticação do usuário');
  }
};

// Função assíncrona para listar usuários com opções de páginação e limite
const listarUsuarios = async (limite = 5, pagina = 1) => {
  try {
    // Calcula o deslocamento com base na página e limite
    const offset = (pagina - 1) * limite;

    // Busca usuários no banco de dados com os parâmetros fornecidos
    const usuarios = await Usuario.findAll({
      limit: limite,
      offset: offset,
    });

    // Retorna a lista de usuários encontrados
    return usuarios;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao listar usuários no serviço:', error);
    throw new Error('Erro ao listar usuários no serviço');
  }
};

// Função assíncrona para obter um usuário pelo ID
const obterUsuarioPorId = async (id) => {
  try {
    // Busca um usuário no banco de dados pelo ID fornecido
    const usuario = await Usuario.findByPk(id);

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Retorna o usuário encontrado
    return usuario;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao obter usuário por ID no serviço:', error);
    throw new Error('Erro ao obter usuário por ID no serviço');
  }
};

// Função assíncrona para excluir um usuário pelo ID
const excluirUsuario = async (id) => {
  try {
    // Busca o usuário no banco de dados pelo ID fornecido
    const usuario = await Usuario.findByPk(id);

    // Verifica se o usuário foi encontrado antes de tentar excluir
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Exclui o usuário do banco de dados
    await usuario.destroy();
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao excluir usuário no serviço:', error);
    throw new Error('Erro ao excluir usuário no serviço');
  }
};

// Função assíncrona para criar um usuário administrador padrão
const criarAdministradorPadrao = async () => {
  try {
    // Verifica se já existe um administrador no banco de dados
    const adminExists = await Usuario.findOne({ where: { isAdmin: true } });

    // Se não existir, cria um administrador padrão
    if (!adminExists) {
      const hashedSenha = await bcrypt.hash('senhaAdmin', 10); // Coloque uma senha segura aqui
      await Usuario.create({ nome: 'Admin', email: 'admin@example.com', senha: hashedSenha, isAdmin: true });
    }
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao criar administrador padrão no serviço:', error);
    throw new Error('Erro ao criar administrador padrão no serviço');
  }
};

// Função assíncrona para cadastrar um novo administrador
const criarAdministrador = async (nome, email, senha) => {
  try {
    // Hash da senha antes de salvar no banco de dados
    const hashedSenha = await bcrypt.hash(senha, 10);
    
    // Cria um novo usuário administrador no banco de dados
    const usuario = await Usuario.create({ nome, email, senha: hashedSenha, isAdmin: true });
    return usuario;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao criar novo administrador no serviço:', error);
    throw new Error('Erro ao criar novo administrador no serviço');
  }
};

// Função assíncrona para excluir um usuário não administrador
const excluirUsuarioNaoAdmin = async (id) => {
  try {
    // Busca o usuário no banco de dados pelo ID fornecido
    const usuario = await Usuario.findByPk(id);

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se o usuário não é um administrador antes de excluir
    if (!usuario.isAdmin) {
      await usuario.destroy();
    } else {
      // Lança uma exceção se o usuário for um administrador
      throw new Error('Administradores não podem ser excluídos por esta rota');
    }
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao excluir usuário não administrador no serviço:', error);
    throw new Error('Erro ao excluir usuário não administrador no serviço');
  }
};

// Função para gerar um token de autenticação
const generateToken = (userId) => {
  try {
    // Gera um token usando o ID do usuário e uma chave secreta
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao gerar token:', error);
    throw new Error('Erro ao gerar token');
  }
};

// Função para verificar um token de autenticação
const verifyToken = (token) => {
  try {
    // Verifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { userId: decoded.userId }; // Certifique-se de incluir isAdmin aqui
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao verificar o token:', error);
    throw error;
  }
};

// Função assíncrona para atualizar informações de um usuário
const atualizarUsuario = async (userId, novasInformacoes) => {
  try {
    // Busca o usuário no banco de dados pelo ID fornecido
    const usuario = await Usuario.findByPk(userId);

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      console.error(`Usuário com ID ${userId} não encontrado.`);
      throw new Error('Usuário não encontrado');
    }

    // Atualiza as propriedades desejadas do usuário
    usuario.nome = novasInformacoes.nome || usuario.nome;
    usuario.email = novasInformacoes.email || usuario.email;
    
    // Se uma nova senha for fornecida, faz o hash e atualiza
    if (novasInformacoes.senha) {
      usuario.senha = await bcrypt.hash(novasInformacoes.senha, 10);
    }

    // Salva as alterações no banco de dados
    await usuario.save();

    console.log(`Informações do usuário com ID ${userId} atualizadas com sucesso.`);
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao atualizar informações do usuário no serviço:', error);
    throw new Error('Erro ao atualizar informações do usuário no serviço');
  }
};

// Exporta as funções do serviço para uso em outros módulos
module.exports = {
  cadastrarUsuario,
  autenticarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  excluirUsuario,
  criarAdministradorPadrao,
  criarAdministrador,
  excluirUsuarioNaoAdmin,
  generateToken,
  verifyToken,
  atualizarUsuario,
};