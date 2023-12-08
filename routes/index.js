// /routes/index.js

/**
 * @swagger
 * tags:
 *   name: Concessionária
 *   description: Rotas relacionadas à Concessionária
 */

const express = require('express');
const installRoutes = require('./installRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const marcaRoutes = require('./marcaRoutes');
const modeloRoutes = require('./modeloRoutes');
const carroRoutes = require('./carroRoutes');
const vendaRoutes = require('./vendaRoutes');
const docsRoutes = require('./docsRoutes');

const router = express.Router();

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Retorna a documentação Swagger da API
 *     tags: [Concessionária]
 *     responses:
 *       200:
 *         description: Documentação Swagger gerada com sucesso
 */
router.use('/docs', docsRoutes);

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Instalação inicial da API (Criação de tabelas e dados iniciais)
 *     tags: [Concessionária]
 *     responses:
 *       200:
 *         description: Instalação concluída com sucesso
 */
router.use('/install', installRoutes);

router.use('/usuarios', usuarioRoutes);

router.use('/marcas', marcaRoutes);

router.use('/modelos', modeloRoutes);

router.use('/carros', carroRoutes);

router.use('/vendas', vendaRoutes);

module.exports = router;
