// controllers/modeloController.js
// Importa o serviço responsável pelas operações relacionadas a modelos
const modeloService = require('../services/modeloService');

// Função assíncrona para cadastrar um novo modelo
const cadastrarModelo = async (req, res) => {
  try {
    // Extrai o nome e o ID da marca do corpo da requisição
    const { nome, marcaId } = req.body;

    // Chama o serviço para cadastrar o modelo com os dados fornecidos
    const modelo = await modeloService.cadastrarModelo(nome, marcaId);

    // Retorna a resposta com o modelo cadastrado e status 201 (Created)
    res.status(201).json(modelo);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para listar modelos com opções de limite e páginação
const listarModelos = async (req, res) => {
  try {
    // Extrai os parâmetros de limite e página da consulta
    const { limite, pagina } = req.query;

    // Chama o serviço para listar os modelos com os parâmetros fornecidos
    const modelos = await modeloService.listarModelos(limite, pagina);

    // Retorna a lista de modelos como resposta
    res.json(modelos);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao listar modelos.' });
  }
};

// Função assíncrona para obter um modelo por ID
const obterModeloPorId = async (req, res) => {
  try {
    // Chama o serviço para obter o modelo pelo ID fornecido na URL
    const modelo = await modeloService.obterModeloPorId(req.params.id);

    // Verifica se o modelo foi encontrado e retorna-o, caso contrário, retorna status 404 (Not Found)
    if (modelo) {
      res.json(modelo);
    } else {
      res.status(404).json({ mensagem: 'Modelo não encontrado.' });
    }
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao obter modelo.' });
  }
};

// Função assíncrona para atualizar os dados de um modelo por ID
const atualizarModelo = async (req, res) => {
  try {
    // Chama o serviço para atualizar o modelo com os dados fornecidos
    const modelo = await modeloService.atualizarModelo(req.params.id, req.body);

    // Retorna o modelo atualizado como resposta
    res.json(modelo);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para excluir um modelo por ID
const excluirModelo = async (req, res) => {
  try {
    // Chama o serviço para excluir o modelo pelo ID fornecido na URL
    await modeloService.excluirModelo(req.params.id);

    // Retorna status 204 (No Content) indicando sucesso na exclusão
    res.status(204).send();
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao excluir modelo.' });
  }
};

// Exporta as funções do controlador para uso em outros módulos
module.exports = {
  cadastrarModelo,
  listarModelos,
  obterModeloPorId,
  atualizarModelo,
  excluirModelo,
};