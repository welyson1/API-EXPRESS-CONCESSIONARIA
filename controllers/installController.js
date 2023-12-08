// controllers/installController.js

const bcrypt = require('bcrypt');
const { Usuario, Marca, Modelo, Carro, Venda, sequelize } = require('../models');

async function install(req, res) {
  try {
    // Sincronizar os modelos com o banco de dados
    await sequelize.sync({ force: true });

    // Inserir usuários
    const usuario = await Usuario.bulkCreate([
      { nome: 'Admin', email: 'admin@example.com', senha: await bcrypt.hash('senhaAdmin', 10), isAdmin: true },
      { nome: 'Usuário Comum 1', email: 'usuario1@example.com', senha: await bcrypt.hash('senhaUsuario1', 10), isAdmin: false },
      { nome: 'Usuário Comum 2', email: 'usuario2@example.com', senha: await bcrypt.hash('senhaUsuario2', 10), isAdmin: false },
      { nome: 'Usuário Comum 3', email: 'usuario3@example.com', senha: await bcrypt.hash('senhaUsuario3', 10), isAdmin: false },
      { nome: 'Usuário Comum 4', email: 'usuario4@example.com', senha: await bcrypt.hash('senhaUsuario4', 10), isAdmin: false },
    ]);

    // Inserir marcas
    const marca = await Marca.bulkCreate([
      { nome: 'Toyota' },
      { nome: 'Honda' },
      { nome: 'Chevrolet' },
      { nome: 'Ford' },
      { nome: 'Volkswagen' },
    ]);

    // Inserir modelos
    const modelo = await Modelo.bulkCreate([
      { nome: 'Corolla', marcaId: marca[0].id },
      { nome: 'Civic', marcaId: marca[1].id },
      { nome: 'Cruze', marcaId: marca[2].id },
      { nome: 'Focus', marcaId: marca[3].id },
      { nome: 'Golf', marcaId: marca[4].id },
    ]);

    // Inserir carros
    const carro = await Carro.bulkCreate([
      { modeloId: modelo[0].id, ano: 2022, cor: 'Preto', preco: 80000.0 },
      { modeloId: modelo[1].id, ano: 2021, cor: 'Branco', preco: 75000.0 },
      { modeloId: modelo[2].id, ano: 2023, cor: 'Prata', preco: 85000.0 },
      { modeloId: modelo[3].id, ano: 2020, cor: 'Azul', preco: 70000.0 },
      { modeloId: modelo[4].id, ano: 2022, cor: 'Vermelho', preco: 90000.0 },
    ]);

    // Inserir vendas
    const venda = await Venda.bulkCreate([
      { carroId: carro[0].id, compradorId: usuario[1].id, dataVenda: new Date() },
      { carroId: carro[1].id, compradorId: usuario[0].id, dataVenda: new Date() },
      { carroId: carro[2].id, compradorId: usuario[1].id, dataVenda: new Date() },
      { carroId: carro[3].id, compradorId: usuario[2].id, dataVenda: new Date() },
      { carroId: carro[4].id, compradorId: usuario[3].id, dataVenda: new Date() },
    ]);

    res.status(200).json({ message: 'Instalação concluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro durante a instalação.' });
  }
}

module.exports = {
  install,
};
