// Aquí puedes escribir tus rutas... 
const express = require('express');
const router = express.Router();
const direccionController = require('../controllers/direccionController');
const authMiddleware = require('../middleware/authMiddleware')

// Rutas de direcciones
router.post('/crear', direccionController.crearDireccion);
router.get('/obtener', authMiddleware, direccionController.obtenerDirecciones);
router.get('/obtener/userDir/:id', authMiddleware, direccionController.obtenerDireccionesByUser);
router.put('/actualizar/:id', authMiddleware, direccionController.actualizarDireccion);
router.delete('/eliminar/:id', authMiddleware, direccionController.eliminarDireccion);

module.exports = router;
