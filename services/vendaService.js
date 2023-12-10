// services/vendaService.js
const { Venda, Carro, Usuario, Modelo, Marca } = require('../models');

// Função assíncrona para cadastrar uma nova venda
const cadastrarVenda = async (carroId, compradorId, dataVenda) => {
  try {
    // Cria uma nova venda no banco de dados
    const venda = await Venda.create({ carroId, compradorId, dataVenda });
    return venda;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao cadastrar venda no serviço:', error);
    throw new Error('Erro ao cadastrar venda no serviço');
  }
};

// Função assíncrona para listar vendas com opções de páginação e limite
const listarVendas = async (pagina = 1, limite = 10) => {
  try {
    // Converte os parâmetros para números inteiros
    const paginaInt = parseInt(pagina, 10);
    const limiteInt = parseInt(limite, 10);

    // Verifica se os valores são válidos
    if (isNaN(paginaInt) || isNaN(limiteInt) || paginaInt < 1 || limiteInt < 1) {
      throw new Error('Valores inválidos para página ou limite');
    }

    // Calcula o deslocamento com base na página e limite
    const offset = (paginaInt - 1) * limiteInt;

    // Busca vendas no banco de dados com os parâmetros fornecidos
    const vendas = await Venda.findAll({
      limit: limiteInt,
      offset: offset,
    });

    // Retorna a lista de vendas encontradas
    return vendas;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao listar vendas no serviço:', error);
    throw new Error('Erro ao listar vendas no serviço');
  }
};

// Função assíncrona para obter uma venda pelo ID
const obterVendaPorId = async (id) => {
  try {
    // Busca uma venda no banco de dados pelo ID fornecido
    const venda = await Venda.findByPk(id);

    // Verifica se a venda foi encontrada
    if (!venda) {
      throw new Error('Venda não encontrada');
    }

    // Retorna a venda encontrada
    return venda;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao obter venda por ID no serviço:', error);
    throw new Error('Erro ao obter venda por ID no serviço');
  }
};

// Função assíncrona para excluir uma venda pelo ID
const excluirVenda = async (id) => {
  try {
    // Exclui a venda do banco de dados com base no ID fornecido
    await Venda.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao excluir venda no serviço:', error);
    throw new Error('Erro ao excluir venda no serviço');
  }
};

// Função assíncrona para atualizar informações de uma venda
const atualizarVenda = async (id, carroId, compradorId, dataVenda) => {
  try {
    // Busca a venda no banco de dados pelo ID fornecido
    const venda = await Venda.findByPk(id);

    // Verifica se a venda foi encontrada
    if (!venda) {
      throw new Error('Venda não encontrada');
    }

    // Atualiza as propriedades desejadas da venda
    venda.carroId = carroId || venda.carroId;
    venda.compradorId = compradorId || venda.compradorId;
    venda.dataVenda = dataVenda || venda.dataVenda;

    // Salva as alterações no banco de dados
    await venda.save();

    // Retorna a venda atualizada
    return venda;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao atualizar venda no serviço:', error);
    throw new Error('Erro ao atualizar venda no serviço');
  }
};

// Função assíncrona para listar vendas por intervalo de datas
const listarVendasPorIntervaloDeDatas = async (dataInicio, dataFim) => {
  try {
    // Busca vendas no banco de dados com base no intervalo de datas fornecido
    const vendas = await Venda.findAll({
      where: {
        dataVenda: {
          [Sequelize.Op.between]: [dataInicio, dataFim],
        },
      },
      include: [
        {
          model: Carro,
          include: [
            {
              model: Modelo,
              include: [Marca],
            },
          ],
        },
        Usuario,
      ],
    });

    // Retorna a lista de vendas encontradas
    return vendas;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error('Erro ao listar vendas por intervalo de datas no serviço:', error);
    throw new Error('Erro ao listar vendas por intervalo de datas no serviço');
  }
};

// Exporta as funções do serviço para uso em outros módulos
module.exports = {
  cadastrarVenda,
  listarVendas,
  obterVendaPorId,
  excluirVenda,
  atualizarVenda,
  listarVendasPorIntervaloDeDatas,
};