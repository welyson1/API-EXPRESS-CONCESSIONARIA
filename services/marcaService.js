// services/marcaService.js
// Importa o modelo Marca do módulo models
const { Marca } = require('../models');

// Função assíncrona para cadastrar uma nova marca
const cadastrarMarca = async (nome) => {
  // Cria uma nova marca no banco de dados com o nome fornecido
  const marca = await Marca.create({ nome });

  // Retorna o objeto da marca cadastrada
  return marca;
};

// Função assíncrona para listar marcas com opções de páginação e limite
const listarMarcas = async (limite = 5, pagina = 1) => {
  // Calcula o deslocamento com base na página e limite
  const offset = (pagina - 1) * limite;

  // Busca marcas no banco de dados com os parâmetros fornecidos
  const marcas = await Marca.findAll({
    limit: limite,
    offset: offset,
  });

  // Retorna a lista de marcas encontradas
  return marcas;
};

// Função assíncrona para obter uma marca pelo ID
const obterMarcaPorId = async (id) => {
  // Busca uma marca no banco de dados pelo ID fornecido
  const marca = await Marca.findByPk(id);

  // Retorna a marca encontrada (ou null se não encontrada)
  return marca;
};

// Função assíncrona para excluir uma marca pelo ID
const excluirMarca = async (id) => {
  // Busca uma marca no banco de dados pelo ID fornecido
  const marca = await Marca.findByPk(id);

  // Verifica se a marca existe antes de tentar excluir
  if (marca) {
    // Exclui a marca do banco de dados
    await marca.destroy();
  }
};

// Função assíncrona para atualizar uma marca pelo ID com o nome fornecido
const atualizarMarca = async (id, nome) => {
  try {
    // Verifica se a marca existe
    const marcaExistente = await Marca.findByPk(id);
    if (!marcaExistente) {
      throw new Error('Marca não encontrada.');
    }

    // Atualiza o nome da marca
    marcaExistente.nome = nome;

    // Salva as alterações no banco de dados
    await marcaExistente.save();

    // Retorna o objeto da marca atualizada
    return marcaExistente;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao atualizar marca no serviço:', error);
    throw new Error('Erro ao atualizar marca no serviço.');
  }
};

// Exporta as funções do serviço para uso em outros módulos
module.exports = {
  cadastrarMarca,
  listarMarcas,
  obterMarcaPorId,
  excluirMarca,
  atualizarMarca,
};