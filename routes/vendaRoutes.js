const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');
const { authenticateJWT } = require('../config/middleware');

// Middleware para autenticação JWT
router.use(authenticateJWT);

/**
 * @swagger
 * tags:
 *   name: Venda
 *   description: Operações relacionadas a Vendas de Veículos
 */

/**
 * @swagger
 * /vendas/cadastrar:
 *   post:
 *     summary: Cadastrar uma nova venda
 *     tags: [Venda]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carroId:
 *                 type: integer
 *                 description: ID do carro associado à venda (obrigatório)
 *               compradorId:
 *                 type: integer
 *                 description: ID do comprador associado à venda (obrigatório)
 *               dataVenda:
 *                 type: string
 *                 format: date
 *                 description: Data da venda (obrigatório, formato YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Venda cadastrada com sucesso
 *       400:
 *         description: Erro durante o cadastro da venda
 */
router.post('/cadastrar', vendaController.cadastrarVenda);

/**
 * @swagger
 * /vendas/listar:
 *   get:
 *     summary: Listar vendas
 *     tags: [Venda]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         description: Número de vendas a serem retornadas (valores possíveis 5, 10, 30)
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 5
 *           maximum: 30
 *       - in: query
 *         name: pagina
 *         description: Número da página a ser retornada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso
 *       400:
 *         description: Erro ao listar vendas
 */
router.get('/listar', vendaController.listarVendas);

/**
 * @swagger
 * /vendas/obter/{id}:
 *   get:
 *     summary: Obter detalhes de uma venda por ID
 *     tags: [Venda]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da venda a ser obtida
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da venda obtidos com sucesso
 *       404:
 *         description: Venda não encontrada
 *       400:
 *         description: Erro ao obter venda por ID
 */
router.get('/obter/:id', vendaController.obterVendaPorId);

/**
 * @swagger
 * /vendas/atualizar/{id}:
 *   put:
 *     summary: Atualizar uma venda por ID
 *     tags: [Venda]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da venda a ser atualizada
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: dadosAtualizados
 *         description: Dados atualizados da venda
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Venda'
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *       404:
 *         description: Venda não encontrada
 *       400:
 *         description: Erro ao atualizar venda
 */
router.put('/atualizar/:id', vendaController.atualizarVenda);

/**
 * @swagger
 * /vendas/excluir/{id}:
 *   delete:
 *     summary: Excluir uma venda por ID
 *     tags: [Venda]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da venda a ser excluída
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Venda excluída com sucesso
 *       404:
 *         description: Venda não encontrada
 *       400:
 *         description: Erro ao excluir venda
 */
router.delete('/excluir/:id', vendaController.excluirVenda);


module.exports = router;