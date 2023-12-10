// routes/usuarioRoutes.js

const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { authenticateJWT, isAdmin } = require('../config/middleware');

const router = express.Router();

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autentica um usuário e fornece um token JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       401:
 *         description: Credenciais inválidas
*/
router.post('/login', usuarioController.autenticarUsuario);

/**
 * @swagger
 * /usuarios/cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Falha ao cadastrar usuário
 */
router.post('/cadastrar', usuarioController.cadastrarUsuario);


// Middleware para autenticação JWT
router.use(authenticateJWT);

/**
 * @swagger
 * /usuarios/perfil:
 *   get:
 *     summary: Obtém o perfil do usuário autenticado
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Perfil do usuário recuperado com sucesso
 */
router.get('/perfil', (req, res) => {
  res.json({ mensagem: 'Esta é uma rota protegida!' });
});

/**
 * @swagger
 * /usuarios/listar:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Número de usuários a serem retornados (valores possíveis 5, 10, 30)
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
 *         description: Lista de usuários recuperada com sucesso
 */
router.get('/listar', usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios/obter/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário recuperado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/obter/:id', usuarioController.obterUsuarioPorId);

/**
 * @swagger
 * /usuarios/excluir/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       400:
 *         description: Falha ao excluir usuário
 */
router.delete('/excluir/:id', usuarioController.excluirUsuario);


// Atualizar informações do usuário
router.put('/atualizar/:id', authenticateJWT, usuarioController.atualizarUsuario);

module.exports = router;