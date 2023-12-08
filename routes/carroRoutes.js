// routes/carroRoutes.js
const express = require('express');
const carroController = require('../controllers/carroController');
const { authenticateJWT } = require('../config/middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carros
 *   description: Rotas relacionadas a carros
 */

// Middleware para autenticação JWT
router.use(authenticateJWT);

/**
 * @swagger
 * /carros/cadastrar:
 *   post:
 *     summary: Cadastra um novo carro
 *     tags: [Carros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modeloId:
 *                 type: integer
 *               ano:
 *                 type: integer
 *               cor:
 *                 type: string
 *               preco:
 *                 type: number
 *             required:
 *               - modeloId
 *               - ano
 *               - cor
 *               - preco
 *     responses:
 *       201:
 *         description: Carro cadastrado com sucesso
 *       400:
 *         description: Falha ao cadastrar carro
 */
router.post('/cadastrar', carroController.cadastrarCarro);

/**
 * @swagger
 * /carros/listar:
 *   get:
 *     summary: Lista todos os carros com paginação
 *     tags: [Carros]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Número de carros a serem retornados (valores possíveis 5, 10, 30)
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 5
 *           maximum: 30
 *       - name: pagina
 *         in: query
 *         description: Número da página a ser retornada
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Lista de carros recuperada com sucesso
 */
router.get('/listar', carroController.listarCarros);

/**
 * @swagger
 * /carros/obter/{id}:
 *   get:
 *     summary: Obtém um carro pelo ID
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carro recuperado com sucesso
 *       404:
 *         description: Carro não encontrado
 */
router.get('/obter/:id', carroController.obterCarroPorId);

/**
 * @swagger
 * /carros/excluir/{id}:
 *   delete:
 *     summary: Exclui um carro pelo ID
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carro excluído com sucesso
 *       400:
 *         description: Falha ao excluir carro
 */
router.delete('/excluir/:id', carroController.excluirCarro);

/**
 * @swagger
 * /carros/atualizar/{id}:
 *   put:
 *     summary: Atualiza um carro pelo ID.
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do carro a ser atualizado.
 *     requestBody:
 *       description: Objeto contendo os dados a serem atualizados no carro.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modeloId:
 *                 type: integer
 *                 description: Novo ID do modelo do carro.
 *                 example: 1
 *               ano:
 *                 type: integer
 *                 description: Novo ano do carro.
 *                 example: 2023
 *               cor:
 *                 type: string
 *                 description: Nova cor do carro.
 *                 example: Azul
 *               preco:
 *                 type: number
 *                 description: Novo preço do carro.
 *                 example: 50000.00
 *     responses:
 *       200:
 *         description: Carro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do carro.
 *                   example: 1
 *                 modeloId:
 *                   type: integer
 *                   description: ID do modelo do carro.
 *                   example: 1
 *                 ano:
 *                   type: integer
 *                   description: Ano do carro.
 *                   example: 2023
 *                 cor:
 *                   type: string
 *                   description: Cor do carro.
 *                   example: Azul
 *                 preco:
 *                   type: number
 *                   description: Preço do carro.
 *                   example: 50000.00
 *       400:
 *         description: Erro nos parâmetros da requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: ID do carro inválido.
 *       404:
 *         description: Carro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: Carro não encontrado.
 *       500:
 *         description: Erro ao atualizar carro.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: Erro ao atualizar carro no serviço.
 */
router.put('/atualizar/:id', carroController.atualizarCarro);


module.exports = router;