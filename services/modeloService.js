// services/modeloService.js
// Importa o modelo Modelo do módulo models
const { Modelo } = require('../models');

// Função assíncrona para cadastrar um novo modelo
const cadastrarModelo = async (nome, marcaId) => {
  try {
    // Cria um novo modelo no banco de dados com os dados fornecidos
    const modelo = await Modelo.create({ nome, marcaId });
    return modelo;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao cadastrar modelo no serviço:', error);
    throw new Error('Erro ao cadastrar modelo no serviço');
  }
};

// Função assíncrona para listar modelos com opções de páginação e limite
const listarModelos = async (limite = 5, pagina = 1) => {
  try {
    // Calcula o deslocamento com base na página e limite
    const offset = (pagina - 1) * limite;

    // Busca modelos no banco de dados com os parâmetros fornecidos
    const modelos = await Modelo.findAll({
      limit: limite,
      offset: offset,
    });

    // Retorna a lista de modelos encontrados
    return modelos;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao listar modelos no serviço:', error);
    throw new Error('Erro ao listar modelos no serviço');
  }
};

// Função assíncrona para obter um modelo pelo ID
const obterModeloPorId = async (id) => {
  try {
    // Busca um modelo no banco de dados pelo ID fornecido
    const modelo = await Modelo.findByPk(id);

    // Verifica se o modelo foi encontrado
    if (!modelo) {
      throw new Error('Modelo não encontrado');
    }

    // Retorna o modelo encontrado
    return modelo;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao obter modelo por ID no serviço:', error);
    throw new Error('Erro ao obter modelo por ID no serviço');
  }
};

// Função assíncrona para atualizar um modelo pelo ID com os dados fornecidos
const atualizarModelo = async (id, dadosAtualizados) => {
  try {
    // Busca o modelo no banco de dados pelo ID fornecido
    const modelo = await Modelo.findByPk(id);

    // Verifica se o modelo foi encontrado
    if (!modelo) {
      throw new Error('Modelo não encontrado');
    }

    // Atualiza os campos do modelo com os dados fornecidos, se existirem
    const { nome, marcaId } = dadosAtualizados;
    if (nome) {
      modelo.nome = nome;
    }
    if (marcaId !== undefined) {
      modelo.marcaId = marcaId;
    }

    // Salva as alterações no banco de dados
    await modelo.save();

    // Retorna o modelo atualizado
    return modelo;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao atualizar modelo no serviço:', error);
    throw new Error('Erro ao atualizar modelo no serviço');
  }
};

// Função assíncrona para excluir um modelo pelo ID
const excluirModelo = async (id) => {
  try {
    // Busca o modelo no banco de dados pelo ID fornecido
    const modelo = await Modelo.findByPk(id);

    // Verifica se o modelo foi encontrado antes de tentar excluir
    if (!modelo) {
      throw new Error('Modelo não encontrado');
    }

    // Exclui o modelo do banco de dados
    await modelo.destroy();
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao excluir modelo no serviço:', error);
    throw new Error('Erro ao excluir modelo no serviço');
  }
};

// Exporta as funções do serviço para uso em outros módulos
module.exports = {
  cadastrarModelo,
  listarModelos,
  obterModeloPorId,
  atualizarModelo,
  excluirModelo,
};