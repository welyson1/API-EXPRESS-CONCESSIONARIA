// routes/marcaRoutes.js

const express = require('express');
const marcaController = require('../controllers/marcaController');
const { authenticateJWT } = require('../config/middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Marcas
 *   description: Rotas relacionadas a marcas
 */

// Middleware para autenticação JWT
router.use(authenticateJWT);

/**
 * @swagger
 * /marcas/cadastrar:
 *   post:
 *     summary: Cadastra uma nova marca
 *     tags: [Marcas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       200:
 *         description: Marca cadastrada com sucesso
 *       400:
 *         description: Falha ao cadastrar marca
 */
router.post('/cadastrar', marcaController.cadastrarMarca);

/**
 * @swagger
 * /marcas/listar:
 *   get:
 *     summary: Lista todas as marcas
 *     tags: [Marcas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Número de marcas a serem retornadas (valores possíveis 5, 10, 30)
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
 *         description: Lista de marcas recuperada com sucesso
 */
router.get('/listar', marcaController.listarMarcas);

/**
 * @swagger
 * /marcas/obter/{id}:
 *   get:
 *     summary: Obtém uma marca pelo ID
 *     tags: [Marcas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da marca a ser obtida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca recuperada com sucesso
 *       404:
 *         description: Marca não encontrada
 */
router.get('/obter/:id', marcaController.obterMarcaPorId);

/**
 * @swagger
 * /marcas/excluir/{id}:
 *   delete:
 *     summary: Exclui uma marca pelo ID
 *     tags: [Marcas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da marca a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Marca excluída com sucesso
 *       500:
 *         description: Falha ao excluir marca
 */
router.delete('/excluir/:id', marcaController.excluirMarca);

/**
 * @swagger
 * /marcas/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma marca pelo ID.
 *     tags: [Marcas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da marca a ser atualizada.
 *     requestBody:
 *       description: Objeto contendo os dados a serem atualizados na marca.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome da marca.
 *                 example: Nova Marca
 *     responses:
 *       200:
 *         description: Marca atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da marca.
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   description: Nome atualizado da marca.
 *                   example: Nova Marca
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
 *                   example: ID da marca inválido.
 *       404:
 *         description: Marca não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: Marca não encontrada.
 *       500:
 *         description: Erro ao atualizar marca.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: Erro ao atualizar marca no serviço.
 */
router.put('/atualizar/:id', marcaController.atualizarMarca);

module.exports = router;