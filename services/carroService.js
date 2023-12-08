// services/carroService.js
// Importa o modelo Carro do módulo models
const { Carro } = require('../models');

// Função assíncrona para cadastrar um novo carro
const cadastrarCarro = async (modeloId, ano, cor, preco) => {
  // Cria um novo carro no banco de dados com os dados fornecidos
  const carro = await Carro.create({ modeloId, ano, cor, preco });

  // Retorna o objeto do carro cadastrado
  return carro;
};

// Função assíncrona para listar carros com opções de páginação e limite
const listarCarros = async (limite = 5, pagina = 1) => {
  // Calcula o deslocamento com base na página e limite
  const offset = (pagina - 1) * limite;

  // Busca carros no banco de dados com os parâmetros fornecidos
  const carros = await Carro.findAll({
    limit: limite,
    offset: offset,
  });

  // Retorna a lista de carros encontrados
  return carros;
};

// Função assíncrona para obter um carro pelo ID
const obterCarroPorId = async (id) => {
  // Busca um carro no banco de dados pelo ID fornecido
  const carro = await Carro.findByPk(id);

  // Retorna o carro encontrado (ou null se não encontrado)
  return carro;
};

// Função assíncrona para excluir um carro pelo ID
const excluirCarro = async (id) => {
  // Busca um carro no banco de dados pelo ID fornecido
  const carro = await Carro.findByPk(id);

  // Verifica se o carro existe
  if (!carro) {
    throw new Error('Carro não encontrado');
  }

  // Exclui o carro do banco de dados
  await carro.destroy();
};

// Função assíncrona para atualizar um carro pelo ID com os dados fornecidos
const atualizarCarro = async (id, dadosAtualizados) => {
  try {
    // Verifica se o carro existe
    const carroExistente = await Carro.findByPk(id);
    if (!carroExistente) {
      throw new Error('Carro não encontrado.');
    }

    // Atualiza o carro no banco de dados
    const carroAtualizado = await Carro.update(dadosAtualizados, {
      where: { id },
      returning: true, // Retorna o carro atualizado
    });

    // Retorna o objeto do carro atualizado
    return carroAtualizado[1][0].get();
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao atualizar o carro no serviço:', error);
    throw new Error('Erro ao atualizar o carro no serviço.');
  }
};

// Exporta as funções do serviço para uso em outros módulos
module.exports = {
  cadastrarCarro,
  listarCarros,
  obterCarroPorId,
  excluirCarro,
  atualizarCarro,
};