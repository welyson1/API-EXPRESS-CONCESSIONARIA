// controllers/carroController.js
// Importa o serviço responsável pelas operações relacionadas a carros
const carroService = require('../services/carroService');

// Função assíncrona para cadastrar um novo carro
const cadastrarCarro = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { modeloId, ano, cor, preco } = req.body;

    // Chama o serviço para cadastrar o carro com os dados fornecidos
    const carro = await carroService.cadastrarCarro(modeloId, ano, cor, preco);

    // Retorna a resposta com o carro cadastrado e status 201 (Created)
    res.status(201).json(carro);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para listar carros com opções de limite e páginação
const listarCarros = async (req, res) => {
  try {
    // Extrai os parâmetros de limite e página da consulta
    const { limite, pagina } = req.query;

    // Chama o serviço para listar os carros com os parâmetros fornecidos
    const carros = await carroService.listarCarros(limite, pagina);

    // Retorna a lista de carros como resposta
    res.json(carros);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao listar carros.' });
  }
};

// Função assíncrona para obter um carro por ID
const obterCarroPorId = async (req, res) => {
  try {
    // Chama o serviço para obter o carro pelo ID fornecido na URL
    const carro = await carroService.obterCarroPorId(req.params.id);

    // Verifica se o carro foi encontrado e retorna-o, caso contrário, retorna status 404 (Not Found)
    if (carro) {
      res.json(carro);
    } else {
      res.status(404).json({ mensagem: 'Carro não encontrado.' });
    }
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao obter carro.' });
  }
};

// Função assíncrona para excluir um carro por ID
const excluirCarro = async (req, res) => {
  try {
    // Chama o serviço para excluir o carro pelo ID fornecido na URL
    await carroService.excluirCarro(req.params.id);

    // Retorna status 204 (No Content) indicando sucesso na exclusão
    res.status(204).send();
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao excluir carro.' });
  }
};

// Função assíncrona para atualizar os dados de um carro por ID
const atualizarCarro = async (req, res) => {
  try {
    // Extrai o ID da URL e os dados atualizados do corpo da requisição
    const { id } = req.params;
    const dadosAtualizados = req.body;

    // Chama o serviço para atualizar o carro com os dados fornecidos
    const carroAtualizado = await carroService.atualizarCarro(id, dadosAtualizados);

    // Retorna o carro atualizado como resposta
    res.json(carroAtualizado);
  } catch (error) {
    // Verifica se o erro é relacionado a carro não encontrado e retorna status 404 (Not Found) nesse caso
    if (error.message === 'Carro não encontrado.') {
      res.status(404).json({ error: 'Carro não encontrado.' });
    } else {
      // Em caso de outros erros, retorna a mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ error: 'Erro ao atualizar o carro.' });
    }
  }
};

// Exporta as funções do controlador para uso em outros módulos
module.exports = {
  cadastrarCarro,
  listarCarros,
  obterCarroPorId,
  excluirCarro,
  atualizarCarro,
};