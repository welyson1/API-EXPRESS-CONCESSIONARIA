// controllers/marcaController.js

// Função assíncrona para cadastrar uma nova marca
const cadastrarMarca = async (req, res) => {
  try {
    // Extrai o nome da marca do corpo da requisição
    const { nome } = req.body;

    // Chama o serviço para cadastrar a marca com o nome fornecido
    const marca = await marcaService.cadastrarMarca(nome);

    // Retorna a resposta com a marca cadastrada
    res.json(marca);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Função assíncrona para listar marcas com opções de limite e páginação
const listarMarcas = async (req, res) => {
  try {
    // Extrai os parâmetros de limite e página da consulta
    const { limite, pagina } = req.query;

    // Chama o serviço para listar as marcas com os parâmetros fornecidos
    const marcas = await marcaService.listarMarcas(limite, pagina);

    // Retorna a lista de marcas como resposta
    res.json(marcas);
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao listar marcas.' });
  }
};

// Função assíncrona para obter uma marca por ID
const obterMarcaPorId = async (req, res) => {
  try {
    // Chama o serviço para obter a marca pelo ID fornecido na URL
    const marca = await marcaService.obterMarcaPorId(req.params.id);

    // Verifica se a marca foi encontrada e retorna-a, caso contrário, retorna status 404 (Not Found)
    if (marca) {
      res.json(marca);
    } else {
      res.status(404).json({ mensagem: 'Marca não encontrada.' });
    }
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao obter marca.' });
  }
};

// Função assíncrona para excluir uma marca por ID
const excluirMarca = async (req, res) => {
  try {
    // Chama o serviço para excluir a marca pelo ID fornecido na URL
    await marcaService.excluirMarca(req.params.id);

    // Retorna status 204 (No Content) indicando sucesso na exclusão
    res.status(204).send();
  } catch (error) {
    // Em caso de erro, retorna a mensagem de erro com status 500 (Internal Server Error)
    res.status(500).json({ error: 'Erro ao excluir marca.' });
  }
};

// Função assíncrona para atualizar os dados de uma marca por ID
const atualizarMarca = async (req, res) => {
  try {
    // Extrai o ID da URL e o nome atualizado do corpo da requisição
    const { id } = req.params;
    const { nome } = req.body;

    // Verifica se o ID é válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID da marca inválido.' });
    }

    // Verifica se o nome da marca é fornecido
    if (!nome) {
      return res.status(400).json({ error: 'Nome da marca é obrigatório.' });
    }

    // Chama o serviço para atualizar a marca com os dados fornecidos
    const marcaAtualizada = await marcaService.atualizarMarca(id, nome);

    // Retorna a marca atualizada como resposta
    res.json(marcaAtualizada);
  } catch (error) {
    // Em caso de erro, loga o erro e retorna a mensagem de erro com status 500 (Internal Server Error)
    console.error('Erro ao atualizar marca:', error);
    res.status(500).json({ error: 'Erro ao atualizar marca.' });
  }
};

// Exporta as funções do controlador para uso em outros módulos
module.exports = {
  cadastrarMarca,
  listarMarcas,
  obterMarcaPorId,
  excluirMarca,
  atualizarMarca,
};