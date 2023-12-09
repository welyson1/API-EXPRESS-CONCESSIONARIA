// controllers/vendaController.js
// Importa o serviço responsável pelas operações relacionadas a vendas
const vendaService = require('../services/vendaService');

// Função assíncrona para cadastrar uma nova venda
const cadastrarVenda = async (req, res) => {
  try {
    // Extrai o ID do carro, ID do comprador e a data da venda do corpo da requisição
    const { carroId, compradorId, dataVenda } = req.body;

    // Chama o serviço para cadastrar a venda com os dados fornecidos
    const venda = await vendaService.cadastrarVenda(carroId, compradorId, dataVenda);

    // Retorna a resposta com a venda cadastrada
    res.json(venda);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para listar vendas com opções de páginação e limite
const listarVendas = async (req, res) => {
  try {
    // Extrai os parâmetros de página e limite da consulta
    const { pagina, limite } = req.query;

    // Chama o serviço para listar as vendas com os parâmetros fornecidos
    const vendas = await vendaService.listarVendas(pagina, limite);

    // Retorna a lista de vendas como resposta
    res.json(vendas);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para obter uma venda por ID
const obterVendaPorId = async (req, res) => {
  try {
    // Extrai o ID da venda a partir dos parâmetros da URL
    const { id } = req.params;

    // Chama o serviço para obter a venda pelo ID fornecido
    const venda = await vendaService.obterVendaPorId(id);

    // Retorna a venda encontrada como resposta
    res.json(venda);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para excluir uma venda por ID
const excluirVenda = async (req, res) => {
  try {
    // Extrai o ID da venda a partir dos parâmetros da URL
    const { id } = req.params;

    // Chama o serviço para excluir a venda pelo ID fornecido
    await vendaService.excluirVenda(id);

    // Retorna uma mensagem indicando sucesso na exclusão
    res.json({ message: 'Venda excluída com sucesso' });
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para atualizar uma venda por ID
const atualizarVenda = async (req, res) => {
  try {
    // Extrai o ID da venda a partir dos parâmetros da URL
    const { id } = req.params;

    // Extrai o ID do carro, ID do comprador e a data da venda do corpo da requisição
    const { carroId, compradorId, dataVenda } = req.body;

    // Chama o serviço para atualizar a venda com os dados fornecidos
    const venda = await vendaService.atualizarVenda(id, carroId, compradorId, dataVenda);

    // Retorna a venda atualizada como resposta
    res.json(venda);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};


// Exporta as funções do controlador para uso em outros módulos
module.exports = {
  cadastrarVenda,
  listarVendas,
  obterVendaPorId,
  excluirVenda,
  atualizarVenda,
};