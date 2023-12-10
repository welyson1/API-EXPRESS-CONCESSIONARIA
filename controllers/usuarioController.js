// controllers/usuarioController.js
// Importa o serviço responsável pelas operações relacionadas a usuários
const usuarioService = require('../services/usuarioService');
const { Usuario } = require('../models');

// Função assíncrona para cadastrar um novo usuário
const cadastrarUsuario = async (req, res) => {
  try {
    // Extrai o nome, email e senha do corpo da requisição
    const { nome, email, senha } = req.body;

    // Chama o serviço para cadastrar o usuário com os dados fornecidos
    const usuario = await usuarioService.cadastrarUsuario(nome, email, senha);

    // Retorna a resposta com o usuário cadastrado
    res.json(usuario);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para autenticar um usuário
const autenticarUsuario = async (req, res) => {
  try {
    // Extrai o email e senha do corpo da requisição
    const { email, senha } = req.body;

    // Chama o serviço para autenticar o usuário com os dados fornecidos
    const { usuario, token } = await usuarioService.autenticarUsuario(email, senha);

    // Retorna o usuário autenticado e o token de acesso
    res.json({ usuario, token });
  } catch (error) {
    // Em caso de erro, loga o erro e retorna a mensagem de erro com status 500 (Internal Server Error)
    console.error('Erro durante a autenticação:', error);
    res.status(500).json({ error: 'Erro interno durante a autenticação' });
  }
};

// Operações CRUD para usuários
// Função assíncrona para listar usuários com opções de limite e páginação
const listarUsuarios = async (req, res) => {
  try {
    // Extrai os parâmetros de limite e página da consulta
    const { limite, pagina } = req.query;

    // Chama o serviço para listar os usuários com os parâmetros fornecidos
    const usuarios = await usuarioService.listarUsuarios(limite, pagina);

    // Retorna a lista de usuários como resposta
    res.json(usuarios);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

// Função assíncrona para obter um usuário por ID
const obterUsuarioPorId = async (req, res) => {
  try {
    // Chama o serviço para obter o usuário pelo ID fornecido na URL
    const usuario = await usuarioService.obterUsuarioPorId(req.params.id);

    // Verifica se o usuário foi encontrado e retorna-o, caso contrário, retorna status 404 (Not Found)
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao obter usuário.' });
  }
};

// Função assíncrona para excluir um usuário por ID
const excluirUsuario = async (req, res) => {
  try {
    // Chama o serviço para excluir o usuário pelo ID fornecido na URL
    await usuarioService.excluirUsuario(req.params.id);

    // Retorna status 204 (No Content) indicando sucesso na exclusão
    res.status(204).send();
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

// Função assíncrona para criar um administrador padrão (pode ser chamada na inicialização do sistema)
const criarAdministradorPadrao = async (req, res) => {
  try {
    // Chama o serviço para criar um administrador padrão
    await usuarioService.criarAdministradorPadrao();

    // Retorna uma mensagem indicando o sucesso na criação do administrador padrão
    res.json({ message: 'Administrador padrão criado com sucesso' });
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao criar administrador padrão' });
  }
};

// Função assíncrona para criar um novo administrador
const criarNovoAdministrador = async (req, res) => {
  try {
    // Extrai o nome, email e senha do corpo da requisição
    const { nome, email, senha } = req.body;

    // Chama o serviço para criar um novo administrador
    const usuario = await usuarioService.criarAdministrador(nome, email, senha);

    // Retorna o administrador criado com status 201 (Created)
    res.status(201).json(usuario);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para excluir um usuário não administrador
const excluirUsuarioNaoAdmin = async (req, res) => {
  try {
    // Chama o serviço para excluir o usuário não administrador pelo ID fornecido na URL
    await usuarioService.excluirUsuarioNaoAdmin(req.params.id);

    // Retorna status 204 (No Content) indicando sucesso na exclusão
    res.status(204).send();
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao excluir usuário não administrador.' });
  }
};

// Função assíncrona para atualizar informações do usuário
const atualizarUsuario = async (req, res) => {
  try {
    // Extrai o ID do usuário autenticado a partir do token
    const userIdFromToken = req.user.userId;

    // Extrai o ID do usuário a ser atualizado a partir dos parâmetros da URL
    const userIdToUpdate = req.params.id;

    console.log(`Tentativa de atualização do usuário ${userIdToUpdate} por ${userIdFromToken}`);

    // Verifica se o usuário autenticado é um administrador
    if (req.user.isAdmin) {
      console.log('Usuário autenticado como administrador. Permitindo atualização.');
      
      // Administrador pode atualizar informações de qualquer usuário
      try {
        // Chama o serviço para atualizar as informações do usuário com os dados fornecidos
        await usuarioService.atualizarUsuario(userIdToUpdate, req.body);
        console.log(`Informações do usuário ${userIdToUpdate} atualizadas com sucesso por um administrador.`);
        
        // Retorna mensagem de sucesso com status 200 (OK)
        res.status(200).json({ mensagem: 'Informações do usuário atualizadas com sucesso' });
      } catch (updateError) {
        // Em caso de erro, loga o erro e retorna a mensagem de erro com status 500 (Internal Server Error)
        console.error(`Erro ao atualizar informações do usuário ${userIdToUpdate} por um administrador:`, updateError);
        res.status(500).json({ error: 'Erro ao atualizar informações do usuário.' });
      }

    } else if (parseInt(userIdFromToken) === parseInt(userIdToUpdate)) {
      console.log('Usuário autenticado como usuário normal. Permitindo atualização.');
      
      // Usuário pode atualizar suas próprias informações
      try {
        // Chama o serviço para atualizar as informações do usuário com os dados fornecidos
        await usuarioService.atualizarUsuario(userIdToUpdate, req.body);
        console.log(`Informações do usuário ${userIdToUpdate} atualizadas com sucesso pelo próprio usuário.`);
        
        // Retorna mensagem de sucesso com status 200 (OK)
        res.status(200).json({ mensagem: 'Informações do usuário atualizadas com sucesso' });
      } catch (updateError) {
        // Em caso de erro, loga o erro e retorna a mensagem de erro com status 500 (Internal Server Error)
        console.error(`Erro ao atualizar informações do usuário ${userIdToUpdate} pelo próprio usuário:`, updateError);
        res.status(500).json({ error: 'Erro ao atualizar informações do usuário.' });
      }

    } else {
      console.log('Acesso não autorizado. Usuário não é administrador e tenta atualizar informações de outro usuário.');
      
      // Usuário não é administrador e tenta atualizar informações de outro usuário
      res.status(403).json({ error: 'Acesso não autorizado. Você não tem permissão para atualizar informações deste usuário.' });
    }
  } catch (error) {
    // Em caso de erro, loga o erro e retorna a mensagem de erro com status 500 (Internal Server Error)
    console.error('Erro ao processar a atualização de informações do usuário:', error);
    res.status(500).json({ error: 'Erro ao processar a atualização de informações do usuário.' });
  }
};

// Exporta as funções do controlador para uso em outros módulos
module.exports = {
  cadastrarUsuario,
  autenticarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  excluirUsuario,
  criarAdministradorPadrao, 
  criarNovoAdministrador, 
  excluirUsuarioNaoAdmin, 
  atualizarUsuario, 
};