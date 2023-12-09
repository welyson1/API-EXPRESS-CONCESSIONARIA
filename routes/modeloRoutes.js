const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');
const { authenticateJWT } = require('../config/middleware');

// Middleware para autenticação JWT
router.use(authenticateJWT);

/**
 * @swagger
 * tags:
 *   name: Modelo
 *   description: Operações relacionadas a Modelos de Veículos
 */

/**
 * @swagger
 * /modelos/cadastro:
 *   post:
 *     summary: Cadastrar um novo modelo de veículo
 *     tags: [Modelo]
 *     parameters:
 *       - in: body
 *         name: modelo
 *         description: Dados do modelo a ser cadastrado
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome do modelo (obrigatório)
 *             marcaId:
 *               type: integer
 *               description: ID da marca associada ao modelo (obrigatório)
 *     responses:
 *       200:
 *         description: Modelo cadastrado com sucesso
 *       500:
 *         description: Erro ao cadastrar modelo
 */
router.post('/cadastro', modeloController.cadastrarModelo);

/**
 * @swagger
 * /modelos/listar:
 *   get:
 *     summary: Listar modelos de veículos
 *     tags: [Modelo]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         description: Número de carros a serem retornados (valores possíveis 5, 10, 30)
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
 *         description: Lista de modelos retornada com sucesso
 *       500:
 *         description: Erro ao listar modelos
 */
router.get('/listar', modeloController.listarModelos);

/**
 * @swagger
 * /modelos/obter/{id}:
 *   get:
 *     summary: Obter detalhes de um modelo de veículo por ID
 *     tags: [Modelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do modelo a ser obtido
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do modelo obtidos com sucesso
 *       404:
 *         description: Modelo não encontrado
 *       500:
 *         description: Erro ao obter modelo por ID
 */
router.get('/obter/:id', modeloController.obterModeloPorId);

/**
 * @swagger
 * /modelos/atualizar/{id}:
 *   put:
 *     summary: Atualizar um modelo de veículo por ID
 *     tags: [Modelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do modelo a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: dadosAtualizados
 *         description: Dados atualizados do modelo
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Novo nome do modelo (opcional)
 *             marcaId:
 *               type: integer
 *               description: Novo ID da marca associada ao modelo (opcional)
 *     responses:
 *       200:
 *         description: Modelo atualizado com sucesso
 *       404:
 *         description: Modelo não encontrado
 *       500:
 *         description: Erro ao atualizar modelo
 */
router.put('/atualizar/:id', modeloController.atualizarModelo);

/**
 * @swagger
 * /modelos/excluir/{id}:
 *   delete:
 *     summary: Excluir um modelo de veículo por ID
 *     tags: [Modelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do modelo a ser excluído
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modelo excluído com sucesso
 *       404:
 *         description: Modelo não encontrado
 *       500:
 *         description: Erro ao excluir modelo
 */
router.delete('/excluir/:id', modeloController.excluirModelo);

module.exports = router;
