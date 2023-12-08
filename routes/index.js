const usuarioRoutes = require('./usuarioRoutes');
const marcaRoutes = require('./marcaRoutes');
const modeloRoutes = require('./modeloRoutes');
const carroRoutes = require('./carroRoutes');
const vendaRoutes = require('./vendaRoutes');

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
