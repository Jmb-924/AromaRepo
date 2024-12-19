// Aquí puedes escribir tus rutas... 
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const reviewsController = require('../controllers/reviewsController')
const pedidoController = require('../controllers/pedidosController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de productos
router.post('/crear', authMiddleware, productoController.crearProducto);
router.get('/obtener', productoController.obtenerProductos);
router.get('/obtener/:id', productoController.obtenerProducto);
router.get('/obtener/byUser/:id', authMiddleware, productoController.obtenerProductoByUser);
router.put('/actualizar/:id', authMiddleware, productoController.actualizarProducto);
router.put('actualizar/img/:id', authMiddleware, productoController.actualizarImgProducto);
router.delete('/eliminar/:id', authMiddleware, productoController.eliminarProducto);

// Rutas de las reviews
router.post('/reviews/crear', authMiddleware, reviewsController.crearReview)
router.get('/reviews/producto/:productoId', reviewsController.obtenerReviewsPorProducto)
router.get('/reviews/obtener/:id', authMiddleware, reviewsController.obtenerReview)
router.put('/reviews/actualizar/:id', authMiddleware, reviewsController.actualizarReview)
router.delete('/reviews/eliminar/:id', authMiddleware, reviewsController.eliminarReview)

// Rutas de los pedidos
router.post('/pedido/crear', pedidoController.crearPedido);
router.get('/pedido/obtener', pedidoController.obtenerPedidos);
router.get('/pedido/obtenerUser/:id', authMiddleware, pedidoController.obtenerPedidoPorUserId);
router.get('/pedido/obtener/:id', pedidoController.obtenerPedidoPorId);
router.put('/pedido/actualizar/:id', pedidoController.actualizarPedido);
router.delete('/pedido/eliminar/:id', pedidoController.eliminarPedido);

module.exports = router;
